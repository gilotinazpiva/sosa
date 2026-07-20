/* Deterministic enemy-effect and intent-pipeline tests. Run: node tests/enemy-intents.js */
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
global.window=global; window.matchMedia=()=>({matches:false});
global.localStorage={getItem(){return null},setItem(){},removeItem(){}};
global.document={getElementById(){return null},querySelector(){return null},querySelectorAll(){return[]},createElement(){return{style:{setProperty(){}},classList:{add(){},remove(){}},appendChild(){},removeChild(){}}},body:{appendChild(){}},head:{appendChild(){}}};
global.setTimeout=()=>1; global.clearTimeout=()=>{}; global.setInterval=()=>1; global.clearInterval=()=>{}; global.render=()=>{};
for(const file of ['js/data/core.js','js/data/act1.js','js/data/act2.js','js/data/act3.js','js/data/act4.js','js/data/act5.js','js/data/act6.js','js/data/battle-dialogue.js','js/game-core.js','js/game-battle.js','js/game-enemies.js','js/game-bosses.js','js/game-states.js']) vm.runInThisContext(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});
global.AUDIO=new Proxy({},{get:()=>()=>{}}); global.FX=new Proxy({},{get:()=>()=>{}});
function assert(value,message){if(!value)throw new Error(message)}
function reset(){
  GAME.initGame(); GAME.screen='battle'; GAME.battleResolved=false; GAME.turnLock=false;
  GAME.player.hp=GAME.player.maxHp=100; GAME.player.debt=10; GAME.player.poise=0;
  GAME.playerStatuses={coldHold:0,static:0}; GAME.log=[]; GAME.coffinState={active:false,control:3};
  GAME.routeComplianceActive=false; GAME.targetLockedBySomnus=false; GAME.targetSwitchDisabled=false;
  GAME.checkThreshold=()=>{}; GAME.maybeBattleCutIn=()=>{};
}

// Every effect referenced by encounter data must resolve through a registered handler.
const dataText=fs.readFileSync(path.join(root,'js/data/core.js'),'utf8');
const referenced=[...dataText.matchAll(/["']effect["']\s*:\s*["']([^"']+)/g)].map(m=>m[1]);
const unique=[...new Set(referenced)].filter(x=>x!=='none').sort();
assert(unique.every(effect=>typeof GAME.enemyMoveEffectHandlers[effect]==='function'),'Encounter data contains an unhandled enemy effect');
assert(GAME.applyEnemyMoveEffect('unknownEffect')===false,'Unknown effects must remain safe no-ops');

// Handler effects: statuses, control flags, Debt caps, encounter tuning, and Graveframe channel branch.
reset(); assert(GAME.applyEnemyMoveEffect('coldHold')===true && GAME.playerStatuses.coldHold===1,'coldHold handler failed');
GAME.applyEnemyMoveEffect('static'); assert(GAME.playerStatuses.static===1,'static handler failed');
GAME.applyEnemyMoveEffect('tetherPin'); assert(GAME.playerStatuses.coldHold===2,'tetherPin handler failed');
GAME.applyEnemyMoveEffect('condemnedRoute'); assert(GAME.routeComplianceActive,'condemnedRoute handler failed');
GAME.routeComplianceActive=false; GAME.applyEnemyMoveEffect('routeCompliance'); assert(GAME.routeComplianceActive,'routeCompliance handler failed');
GAME.applyEnemyMoveEffect('detain'); assert(GAME.targetLockedBySomnus,'detain handler failed');
GAME.applyEnemyMoveEffect('pursuitMark'); assert(GAME.player.debt===14 && GAME.targetSwitchDisabled,'pursuitMark handler failed');
reset(); GAME.currentEncounterKey='dross_chime'; GAME.applyEnemyMoveEffect('ringDebt'); assert(GAME.player.debt===13,'Knell encounter ringDebt tuning changed');
reset(); GAME.currentEncounterKey='other'; GAME.applyEnemyMoveEffect('ringDebt'); assert(GAME.player.debt===15,'Default ringDebt tuning changed');
reset(); GAME.coffinState={active:true,control:2}; GAME.applyEnemyMoveEffect('ringDebt'); assert(GAME.player.debt===10 && GAME.coffinState.control===1,'Graveframe ringDebt branch changed');
reset(); GAME.currentEncounterKey='dross_slag'; GAME.applyEnemyMoveEffect('overtime'); assert(GAME.player.debt===13,'Slag overtime tuning changed');
reset(); GAME.player.debt=99; GAME.applyEnemyMoveEffect('reportClosed'); assert(GAME.player.debt===100,'Enemy Debt effects must cap at 100');
reset(); GAME.applyEnemyMoveEffect('scanLock'); assert(GAME.playerStatuses.static===1 && GAME.player.debt===13,'scanLock handler failed');

// Stage 1/2: normalization is stable and Web/disruption modifies a copied runtime context, not source move data.
reset();
const move={label:'TEST CUT',type:'single',damage:10,hits:2,effect:'none'};
const enemy={name:'TEST',atk:99,nextMove:move,disrupted:1,webbedTurns:2,hp:100,maxHp:100};
const intent=GAME.applyEnemyIntentControl(GAME.normalizeEnemyIntent(enemy));
assert(intent.damage===6 && intent.hits===2 && intent.disrupted,'Single control scaling changed');
assert(move.damage===10 && move.hits===2,'Intent stages mutated canonical move data');
const barrage=GAME.applyEnemyIntentControl(GAME.normalizeEnemyIntent({name:'B',nextMove:{label:'B',type:'barrage',damage:10,hits:3},disrupted:0,webbedTurns:1,hp:1,maxHp:1}));
assert(barrage.damage===8 && barrage.hits===2,'Web barrage scaling changed');

// Stage 3/4/5: a blocked hit cannot deal damage or smuggle its effect through Guard.
reset();
const striker={name:'STRIKER',hp:100,maxHp:100,dead:false,disabled:false,disrupted:0,webbedTurns:0,nextMove:{label:'PIN',type:'single',damage:20,hits:1,effect:'static'}};
GAME.selectedEnemy=striker; GAME.somnusManifested=false; GAME.resolveGuardImpact=()=> 'blocked';
let damageCalls=0; const originalDamage=GAME.applyEnemyIntentDamage;
GAME.applyEnemyIntentDamage=()=>{damageCalls++};
const blocked=GAME.resolveEnemyIntent(striker);
assert(blocked.resolved && !blocked.reachedPlayer && damageCalls===0 && GAME.playerStatuses.static===0,'Blocked strike leaked damage/effect');

// Open Guard applies deterministic damage and effect exactly once.
GAME.resolveGuardImpact=()=> 'open';
GAME.applyEnemyIntentDamage=(source,damage)=>{damageCalls++; GAME.player.hp-=damage};
damageCalls=0; GAME.player.hp=100; GAME.playerStatuses.static=0;
const open=GAME.resolveEnemyIntent(striker);
assert(open.reachedPlayer && GAME.player.hp===80 && damageCalls===1 && GAME.playerStatuses.static===1,'Open strike pipeline changed');

// Web grounds field intents before both damage and effects.
GAME.applyEnemyIntentDamage=()=>{damageCalls++}; damageCalls=0; GAME.playerStatuses.static=0;
const field={name:'FIELD',hp:100,maxHp:100,dead:false,disabled:false,disrupted:0,webbedTurns:2,nextMove:{label:'CLOSED AIR',type:'field',damage:12,hits:1,effect:'static'}};
const grounded=GAME.resolveEnemyIntent(field);
assert(grounded.resolved && !grounded.reachedPlayer && damageCalls===0 && GAME.playerStatuses.static===0,'Web failed to ground field damage/effect');

// Early Pall area remains unable to bypass a perfect wall when no partial interception applies.
const rime={name:'PALL',originalKey:'rime',hp:100,maxHp:100,dead:false,disabled:false,disrupted:0,webbedTurns:0,nextMove:{label:'COLD WALL',type:'area',damage:30,hits:1,poiseRule:'ignore',effect:'coldHold'}};
damageCalls=0; GAME.playerStatuses.coldHold=0; GAME.resolveEnemyIntent(rime);
assert(damageCalls===0 && GAME.playerStatuses.coldHold===0,'Early Pall area bypassed its ecology guard');
GAME.applyEnemyIntentDamage=originalDamage;

// A single malformed intent cannot strand the real browser on THEIR MOVE.
reset(); const brokenEnemy={name:'BROKEN INTENT',hp:10,maxHp:10,dead:false,disabled:false,isAnchor:false};
GAME.enemyPhaseActive=true; GAME.enemyPhaseEnemies=[brokenEnemy]; GAME.enemyPhaseIndex=0;
const originalResolveIntent=GAME.resolveEnemyIntent, originalConsoleError=console.error; GAME.resolveEnemyIntent=()=>{throw new Error('fixture failure')}; console.error=()=>{};
GAME.resolveNextEnemyIntent();
assert(GAME.enemyPhaseIndex===1&&GAME.log.some(x=>/VEIL ERROR/.test(x)),'Enemy intent exception did not continue safely');
GAME.resolveEnemyIntent=originalResolveIntent; console.error=originalConsoleError;

console.log(JSON.stringify({registeredEffects:unique.length,effectHandlers:'pass',normalization:'pass',webControl:'pass',guardIsolation:'pass',damageEffectOrder:'pass',fieldGrounding:'pass',earlyPallArea:'pass',intentExceptionRecovery:'pass'},null,2));
