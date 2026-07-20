/* Deterministic action-role tests. Run: node tests/combat-mechanics.js */
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
global.window=global; window.matchMedia=()=>({matches:false});
global.localStorage={getItem(){return null},setItem(){},removeItem(){}};
global.document={getElementById(){return null},querySelector(){return null},querySelectorAll(){return[]},createElement(){return{style:{setProperty(){}},classList:{add(){},remove(){}},appendChild(){},removeChild(){}}},body:{appendChild(){}},head:{appendChild(){}}};
global.setTimeout=()=>1; global.clearTimeout=()=>{}; global.setInterval=()=>1; global.clearInterval=()=>{}; global.render=()=>{};
for(const file of ['js/data/core.js','js/data/act1.js','js/data/act2.js','js/data/act3.js','js/data/act4.js','js/data/act5.js','js/data/act6.js','js/data/battle-dialogue.js','js/game-core.js','js/game-battle.js','js/game-enemies.js','js/game-bosses.js','js/game-states.js']) vm.runInThisContext(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});
global.AUDIO=new Proxy({},{get:()=>()=>{}}); global.FX=new Proxy({},{get:()=>()=>{}});
function assert(v,m){if(!v)throw new Error(m)}
function prep(encounter){
  GAME.initGame(); GAME.screen='story'; GAME.currentScene=DATA.scenes.act1_s1; GAME.startBattle(encounter);
  GAME.battleCutIn=null; GAME.battleIntroQueue=[]; GAME.turnLock=false; GAME.somnusNamed=true;
  GAME.player.unlocked.trace=true; GAME.player.unlocked.dismantle=true; GAME.player.unlocked.dismantleNamed=true;
  GAME.checkAutoSelect();
}
const originalEnd=GAME.endPlayerTurn, originalQueue=GAME.queueBlackFlashWindow;
GAME.endPlayerTurn=()=>{}; GAME.queueBlackFlashWindow=()=>false;

// Dismantle: staying on one target deepens the second/third precision cuts, then resets.
prep('dross_spall'); GAME.player.debt=0; GAME.selectedEnemy.hp=GAME.selectedEnemy.maxHp=1000; GAME.selectedEnemy.armor=0;
const depthTarget=GAME.selectedEnemy, depthHp=depthTarget.hp, depthRandom=Math.random; Math.random=()=>0;
GAME.playerDismantle(); assert(depthTarget.dismantleDepth===1,'First Dismantle did not establish Trace Depth 1/3');
GAME.playerDismantle(); assert(depthTarget.dismantleDepth===2,'Second Dismantle did not establish Trace Depth 2/3');
GAME.playerDismantle(); assert(depthTarget.dismantleDepth===0&&depthHp-depthTarget.hp===29,'Third Dismantle breakpoint damage/reset changed');
Math.random=depthRandom;

// Cleave: committed anti-armor action, +7 Debt, cooldown blocks immediate repeat.
prep('dross_spall'); GAME.player.unlocked.cleave=true; GAME.player.debt=10;
GAME.selectedEnemy.hp=GAME.selectedEnemy.maxHp=1000; GAME.selectedEnemy.armor=4;
const cleaveTarget=GAME.selectedEnemy, hpBefore=cleaveTarget.hp;
GAME.playerCleave();
assert(GAME.player.debt===17,'Cleave Debt cost is not +7');
assert(GAME.cleaveCooldown===2,'Cleave did not begin two-step recalibration state');
assert(cleaveTarget.hp<hpBefore && cleaveTarget.armor===3,'Cleave did not damage and strip armor');
const hpAfter=cleaveTarget.hp; GAME.playerCleave();
assert(cleaveTarget.hp===hpAfter,'Cleave repeated while recalibrating');
GAME.cleaveCooldown--; assert(GAME.cleaveCooldown===1,'Cleave cooldown cadence corrupt');
GAME.cleaveCooldown--; assert(GAME.cleaveCooldown===0,'Cleave did not finish recalibration');

// Web: all living enemies controlled, shallow damage, saturation +2, cooldown 3.
prep('kessler_rescue_swarm'); GAME.player.unlocked.web=true; GAME.player.debt=0;
const webBefore=GAME.enemies.map(e=>e.hp); GAME.playerWeb();
assert(GAME.player.debt===10 && GAME.webCooldown===3 && GAME.furnaceSaturation===2,'Web cost/cooldown/saturation mismatch');
GAME.enemies.forEach((e,i)=>assert(e.webbedTurns===2 && e.disrupted===2 && e.hp<webBefore[i],`Web missed enemy ${i}`));

// Cut Ash can accumulate before Furnace is named, but cannot announce/open the move early.
prep('dross_nifl'); GAME.player.unlocked.web=true; GAME.player.unlocked.furnace=false; GAME.furnaceSaturation=0; GAME.furnaceReadyNarrativePending=false;
GAME.addFurnaceSaturation(3); assert(GAME.furnaceSaturation===3&&!GAME.furnaceReadyNarrativePending,'Unnamed Furnace announced itself from pre-unlock residue');
GAME.player.unlocked.furnace=true; GAME.furnaceSaturation=2; GAME.addFurnaceSaturation(1); assert(GAME.furnaceReadyNarrativePending,'Named Furnace failed to announce at three layers');

// Furnace: consumes full saturation and damages every living enemy as true AoE.
prep('kessler_rescue_swarm'); GAME.player.unlocked.furnace=true; GAME.furnaceSaturation=3; GAME.player.debt=0;
GAME.enemies.forEach(e=>{e.hp=e.maxHp=1000;e.dead=false}); const furnaceBefore=GAME.enemies.map(e=>e.hp);
GAME.playerFurnace();
assert(GAME.player.debt===18 && GAME.furnaceSaturation===0,'Furnace cost/reset mismatch');
GAME.enemies.forEach((e,i)=>assert(e.hp<furnaceBefore[i],`Furnace failed to hit enemy ${i}`));

// Kessler support: no first-action proc; second action hits highest-HP body and suppresses it.
prep('kessler_rescue_swarm'); GAME.enemies.forEach((e,i)=>{e.hp=100+i*100;e.maxHp=e.hp;e.dead=false});
const highest=GAME.enemies[GAME.enemies.length-1], supportHp=highest.hp;
GAME.battleTurnCount=1; GAME.applyAlliedSupport(); assert(highest.hp===supportHp,'Ally support fired before configured cadence');
GAME.battleTurnCount=2; GAME.applyAlliedSupport();
assert(highest.hp===supportHp-14 && highest.webbedTurns>=1 && highest.disrupted>=1,'Kessler cadence/damage/suppression mismatch');

// Atlas: unpinned damage transfers into a living Spall carrier; Web stops the transfer.
prep('kessler_joint_hunt');
const atlas=GAME.enemies.find(e=>e.originalKey==='spall_atlas');
const carriers=GAME.enemies.filter(e=>e.originalKey==='spall');
atlas.hp=atlas.maxHp=1000; carriers.forEach(e=>{e.hp=e.maxHp=500;e.dead=false});
const carrierBefore=carriers.map(e=>e.hp); GAME.damageEnemy(atlas,40,true);
assert(atlas.hp===980 && carriers.some((e,i)=>e.hp===carrierBefore[i]-20),'Atlas failed to transfer half of unpinned damage');
assert(GAME.worldFlags.atlasLoadTransfers===1,'Atlas transfer was not recorded');
const pinnedCarrierHp=carriers.map(e=>e.hp); atlas.webbedTurns=2; const atlasPinnedHp=atlas.hp; GAME.damageEnemy(atlas,40,true);
assert(atlas.hp===atlasPinnedHp-40 && carriers.every((e,i)=>e.hp===pinnedCarrierHp[i]),'Web failed to pin Atlas load transfer');
GAME.player.unlocked.furnace=true; GAME.furnaceSaturation=3; GAME.playerFurnace();
assert(GAME.worldFlags.atlasFurnaceUsed===true,'Atlas Furnace collateral was not recorded');

// Second mixed hunt: while Pall, Spall, and Knell all stand, Cue Trade extends barrages; killing one family ends it.
prep('act3_hunt_battle2');
let cueIntent={enemy:GAME.enemies[0],move:{},type:'barrage',damage:8,hits:2,disrupted:false}; GAME.applyEnemyIntentControl(cueIntent);
assert(cueIntent.crossfed&&cueIntent.hits===3,'Cue Trade did not extend a mixed-family barrage');
GAME.enemies.find(e=>e.originalKey==='rime').dead=true;
cueIntent={enemy:GAME.enemies[1],move:{},type:'barrage',damage:8,hits:2,disrupted:false}; GAME.applyEnemyIntentControl(cueIntent);
assert(!cueIntent.crossfed&&cueIntent.hits===2,'Cue Trade survived after one family fell');

// Early mixed nest: Pall lends Spall one armor through Ice Mortar; killing Pall strips it.
prep('act3_hunt_battle');
const mortarPall=GAME.enemies.find(e=>e.originalKey==='rime'), mortarSpall=GAME.enemies.find(e=>e.originalKey==='spall');
assert(mortarSpall.armor===3&&GAME.mixedPairArmorActive,'Ice Mortar did not lend Spall one armor');
GAME.damageEnemy(mortarPall,999,true);
assert(mortarSpall.armor===2&&!GAME.mixedPairArmorActive&&GAME.log.some(x=>/ICE MORTAR BREAKS/.test(x)),'Killing Pall did not strip Ice Mortar');

// Mixed Dross: Pall seals Spall, Spall powers Knell; two uncut loops restore all three and add Debt. Web breaks it.
prep('kessler_rescue_swarm'); GAME.player.unlocked.web=true; GAME.player.debt=12;
GAME.enemies.forEach(e=>{e.hp=Math.max(1,e.maxHp-20);e.dead=false;e.webbedTurns=0}); const mixedWounded=GAME.enemies.map(e=>e.hp);
GAME.finishEnemyPhase(); assert(GAME.mixedCrossfeedClock===1&&GAME.player.debt===12,'Mixed Crossfeed telegraph advanced incorrectly');
GAME.finishEnemyPhase();
assert(GAME.mixedCrossfeedClock===0&&GAME.player.debt===17&&GAME.worldFlags.mixedCrossfeeds===1,'Mixed Crossfeed did not close at 2/2');
assert(GAME.enemies.every((e,i)=>e.hp>mixedWounded[i]),'Mixed Crossfeed did not restore all three ecologies');
GAME.mixedCrossfeedClock=1; GAME.webCooldown=0; GAME.playerWeb(); assert(GAME.mixedCrossfeedClock===0&&GAME.mixedCrossfeedInterrupted,'Web did not cut Mixed Crossfeed');
GAME.finishEnemyPhase(); assert(GAME.mixedCrossfeedClock===0&&!GAME.mixedCrossfeedInterrupted,'Cut Mixed Crossfeed resumed immediately');

// Authored reinforcement waves keep selected encounters inside combat rather than cutting to a new scene.
prep('act1_battle2'); const texasOriginal=GAME.enemies.length; GAME.damageEnemy(GAME.enemies[0],999,true); GAME.damageEnemy(GAME.enemies[1],999,true);
assert(GAME.enemies.length===texasOriginal+2&&GAME.reinforcementState.texas_cold_return,'Texas Pall reinforcement wave did not enter battle');
prep('dross_nifl'); const niflOriginal=GAME.enemies.length, niflCore=GAME.enemies.find(e=>e.originalKey==='rime_nifl'); niflCore.hp=Math.floor(niflCore.maxHp*.5)+1; GAME.damageEnemy(niflCore,1,true);
assert(GAME.enemies.length===niflOriginal+2&&GAME.reinforcementState.nifl_new_accounts,'Nifl did not open reinforcement accounts at half health');

// Overtime: three uninterrupted exchanges extend the shift; Web breaks cadence.
prep('dross_overtime'); GAME.player.unlocked.web=true; GAME.player.debt=10; GAME.enemies.forEach(e=>{e.hp=Math.max(1,e.maxHp-30);e.dead=false});
const overtimeWounded=GAME.enemies.map(e=>e.hp);
GAME.finishEnemyPhase(); GAME.finishEnemyPhase();
assert(GAME.overtimeClock===2 && GAME.player.debt===10,'Overtime cadence advanced incorrectly before threshold');
GAME.finishEnemyPhase();
assert(GAME.overtimeClock===0 && GAME.player.debt===18 && GAME.worldFlags.overtimeExtensions===1,'Mandatory Overtime did not add Debt/reset cadence');
assert(GAME.enemies.slice(0,overtimeWounded.length).every((e,i)=>e.hp>overtimeWounded[i]),'Mandatory Overtime did not restore active bodies');
assert(GAME.enemies.length===overtimeWounded.length+1&&GAME.reinforcementState.overtime_replacement,'Mandatory Overtime did not clock in its replacement wave');
GAME.overtimeClock=2; GAME.webCooldown=0; GAME.playerWeb(); assert(GAME.overtimeClock===0 && GAME.overtimeInterrupted,'Web did not break Overtime routine');
GAME.finishEnemyPhase(); assert(GAME.overtimeClock===0 && !GAME.overtimeInterrupted,'Interrupted Overtime incorrectly advanced cadence');

// Somnus Fixation: high-Debt hits telegraph target lock; Web broadens priority by one stack.
prep('dross_spall'); GAME.player.unlocked.web=true; GAME.player.debt=80; GAME.player.hp=100; const fixationTarget=GAME.selectedEnemy;
GAME.applyEnemyIntentDamage(fixationTarget,1,{damage:1});
GAME.applyEnemyIntentDamage(fixationTarget,1,{damage:1});
assert(GAME.autonomyDrift===2 && GAME.log.some(x=>/FIXATION 2\/3/.test(x)),'Fixation stacks/telegraph missing');
GAME.webCooldown=0; GAME.playerWeb(); assert(GAME.autonomyDrift===1,'Web did not broaden priority by one Fixation stack');
GAME.applyEnemyIntentDamage(fixationTarget,1,{damage:1});
GAME.applyEnemyIntentDamage(fixationTarget,1,{damage:1});
GAME.resolveAutonomyDrift();
assert(GAME.targetLockedBySomnus && GAME.worldFlags.fixationLocks===1 && GAME.log.some(x=>/FIXATION LOCKED/.test(x)),'Somnus target lock did not resolve at 3 stacks');

// Starting/retrying a battle must cancel every tracked callback from the previous session.
const timerKeys=['battleStartTimer','blackFlashArmTimer','blackFlashTimer','battleCutInTimer','battleActionTimer','shatteringTimer','enemyPhaseTimer','enemyAdvanceTimer','enemyPhaseWatchdogTimer','hurtFlashTimer','victoryTimer'];
const cleared=[], originalClearTimeout=global.clearTimeout;
global.clearTimeout=id=>cleared.push(id);
timerKeys.forEach((key,i)=>GAME[key]=100+i); GAME.cancelBattleTimers();
assert(timerKeys.every(key=>GAME[key]===null),'Battle timer cancellation left a live timer reference');
assert(cleared.length===timerKeys.length&&timerKeys.every((key,i)=>cleared.includes(100+i)),'Battle timer cancellation missed a callback');
global.clearTimeout=originalClearTimeout;

GAME.endPlayerTurn=originalEnd; GAME.queueBlackFlashWindow=originalQueue;
console.log(JSON.stringify({dismantleDepth:'pass',cleave:'pass',web:'pass',residueGate:'pass',furnaceAoE:'pass',allyCadence:'pass',atlasTransfer:'pass',atlasCollateral:'pass',cueTrade:'pass',iceMortar:'pass',mixedCrossfeed:'pass',mixedWeb:'pass',reinforcementWaves:'pass',overtimeCadence:'pass',overtimeWeb:'pass',fixationTelegraph:'pass',fixationWeb:'pass',timerCancellation:'pass'},null,2));
