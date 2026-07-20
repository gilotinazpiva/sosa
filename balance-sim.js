/* Seeded full-path combat simulation. Run: node tests/balance-sim.js */
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
const app={innerHTML:'',style:{},offsetHeight:0,classList:{add(){},remove(){}}};
global.window=global;window.matchMedia=()=>({matches:false});
global.localStorage={getItem(){return null},setItem(){},removeItem(){}};
global.document={getElementById(id){return id==='app'?app:null},querySelector(){return null},querySelectorAll(){return[]},createElement(){return{style:{setProperty(){}},classList:{add(){},remove(){}},appendChild(){},removeChild(){}}},body:{appendChild(){}},head:{appendChild(){}}};
global.setTimeout=fn=>{fn();return 1};global.clearTimeout=()=>{};global.setInterval=()=>1;global.clearInterval=()=>{};global.render=()=>{};
for(const file of ['js/data/core.js','js/data/act1.js','js/data/act2.js','js/data/act3.js','js/data/act4.js','js/data/act5.js','js/data/act6.js','js/data/battle-dialogue.js','js/game-core.js','js/game-battle.js','js/game-enemies.js','js/game-bosses.js','js/game-states.js'])vm.runInThisContext(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});
global.AUDIO=new Proxy({},{get:()=>()=>{}});global.FX=new Proxy({},{get:()=>()=>{}});
function rng(seed){let x=seed>>>0;return()=>{x=(1664525*x+1013904223)>>>0;return x/4294967296}}
function chooseAction(){
 if(GAME.blackFlashWindowActive){GAME.triggerBlackFlash();return;}
 if(GAME.battleCutIn&&GAME.battleCutIn.persistent){GAME.dismissBattleCutIn();return;}
 if(GAME.coffinState&&GAME.coffinState.active){ if(GAME.coffinState.control<2)GAME.coffinAnchor();else if(Math.random()<.55)GAME.coffinSteer();else GAME.coffinLetHim();return; }
 if(GAME.currentEncounterKey==='archon_fight'&&GAME.canEmergencyCall()){GAME.beginEmergencyCall();return;}
 if(GAME.bossState&&GAME.bossState.fieldActive){const i=GAME.enemies.findIndex(e=>e.isAnchor&&!e.dead);if(i>=0)GAME.selectEnemy(i)}
 else if(!GAME.selectedEnemy||GAME.selectedEnemy.dead||GAME.selectedEnemy.disabled)GAME.checkAutoSelect();
 if(GAME.canEmergencyCall&&GAME.canEmergencyCall()&&GAME.player.debt>=67){GAME.beginEmergencyCall();return;}
 const pre=!GAME.player.unlocked.dismantleNamed&&!GAME.player.unlocked.cleave&&!GAME.player.unlocked.web;
 if((GAME.tutorial&&GAME.tutorial.active)||pre){GAME.playerRefuse();return;}
 if(GAME.player.unlocked.furnace&&GAME.furnaceSaturation>=3){GAME.playerFurnace();return;}
 if(GAME.player.unlocked.web&&GAME.webCooldown<=0&&GAME.furnaceSaturation===0&&GAME.enemies.filter(e=>!e.dead&&!e.isAnchor).length>1){GAME.playerWeb();return;}
 if(GAME.player.unlocked.hellstep&&!GAME.hellstepActive&&GAME.hellstepCooldown<=0&&GAME.player.debt<88){GAME.playerHellstep();return;}
 if(GAME.player.unlocked.cleave&&GAME.cleaveCooldown<=0){GAME.playerCleave();return;}
 if(GAME.player.unlocked.dismantle){GAME.playerDismantle();return;}
 GAME.playerRefuse();
}
function run(seed){Math.random=rng(seed);GAME.initGame();GAME.screen='story';GAME.currentScene=DATA.scenes.act1_s1;let steps=0,battles=[],retries={};
 while(steps++<5000){
  if(GAME.screen==='story'||GAME.screen==='phone'){GAME.executeSceneAction();continue}
  if(GAME.screen==='audit_scan'){GAME.gotoScene('act4_s5');continue}
  if(GAME.screen==='battle'){
   const encounter=GAME.currentEncounterKey;let turns=0;
   while(GAME.screen==='battle'&&turns++<80)chooseAction();
   battles.push({encounter,turns,screen:GAME.screen,hp:GAME.player.hp,debt:GAME.player.debt});
   if(GAME.screen==='lose'){retries[encounter]=(retries[encounter]||0)+1;if(retries[encounter]<=3){GAME.retryBattle();continue}return{ok:false,where:encounter,battles}}
   if(GAME.screen==='battle')return{ok:false,where:encounter+':softlock',battles,state:{hp:GAME.player.hp,debt:GAME.player.debt,turnLock:GAME.turnLock,blackFlashPending:GAME.blackFlashPendingAction,enemies:GAME.enemies.map(e=>({name:e.name,hp:e.hp,dead:e.dead,isAnchor:e.isAnchor})),log:GAME.log.slice(-15)}};
   continue;
  }
  if(GAME.screen==='win'){GAME.advanceAfterWin();continue}
  if(GAME.screen==='title')return{ok:GAME.currentScene&&GAME.currentScene.key==='act6_first_conflict_end',where:'end',battles};
  if(GAME.screen==='lose')return{ok:false,where:GAME.currentEncounterKey,battles};
  return{ok:false,where:'screen:'+GAME.screen,battles};
 }
 return{ok:false,where:'step-limit',battles};
}
const N=200,failures={},turns={};let wins=0,firstFailure=null;
for(let seed=1;seed<=N;seed++){const r=run(seed);if(r.ok)wins++;else{failures[r.where]=(failures[r.where]||0)+1;if(!firstFailure)firstFailure={seed,...r};}for(const b of r.battles){if(b.screen!=='win')continue;(turns[b.encounter]||(turns[b.encounter]=[])).push(b.turns)}}
const avg={};for(const [k,v] of Object.entries(turns))avg[k]=Math.round(v.reduce((a,b)=>a+b,0)/v.length*100)/100;
console.log(JSON.stringify({runs:N,wins,failures,averagePlayerActions:avg,firstFailure},null,2));
if(wins!==N)process.exit(1);
