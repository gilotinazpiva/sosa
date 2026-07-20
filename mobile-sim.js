/* Deterministic phone-contract simulation (no browser/layout engine available). Run: node tests/mobile-sim.js */
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
const css={base:fs.readFileSync(path.join(root,'css/base.css'),'utf8'),battle:fs.readFileSync(path.join(root,'css/battle.css'),'utf8'),access:fs.readFileSync(path.join(root,'css/accessibility.css'),'utf8'),discord:fs.readFileSync(path.join(root,'css/discord.css'),'utf8'),story:fs.readFileSync(path.join(root,'css/story.css'),'utf8'),effects:fs.readFileSync(path.join(root,'css/effects.css'),'utf8'),title:fs.readFileSync(path.join(root,'css/title.css'),'utf8')};
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
const omnis=fs.readFileSync(path.join(root,'cg_stats_scan.html'),'utf8');
function assert(v,m){if(!v)throw new Error(m)}
const app={innerHTML:'',onclick:null,style:{},offsetHeight:0,classList:{add(){},remove(){}},addEventListener(){},querySelectorAll(){return[]},insertAdjacentHTML(){}};
global.window=global;window.matchMedia=()=>({matches:false});window.innerWidth=390;window.innerHeight=844;
global.localStorage={getItem(){return null},setItem(){},removeItem(){}};
global.document={
 getElementById(id){return id==='app'?app:null},querySelector(){return null},querySelectorAll(){return[]},
 createElement(tag){return{tagName:tag,style:{setProperty(){}},classList:{add(){},remove(){}},appendChild(){},removeChild(){},parentNode:null}},
 body:{appendChild(){}},head:{appendChild(){}},addEventListener(){},removeEventListener(){}
};
global.setInterval=()=>1;global.clearInterval=()=>{};global.setTimeout=fn=>{fn();return 1};global.clearTimeout=()=>{};
global.AUDIO=new Proxy({muted:false,currentMusic:null},{get(t,p){if(p in t)return t[p];return()=>{}}});
global.FX=new Proxy({},{get:()=>()=>{}});
for(const file of ['js/data/core.js','js/data/act1.js','js/data/act2.js','js/data/act3.js','js/data/act4.js','js/data/act5.js','js/data/act6.js','js/data/battle-dialogue.js','js/game-core.js','js/game-battle.js','js/game-enemies.js','js/game-bosses.js','js/game-states.js','js/render.js']) vm.runInThisContext(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});

// Width contracts and responsive rules.
for(const width of [360,390,430,480]){
 window.innerWidth=width;
 assert(css.access.includes(`max-width: ${width}px`)||css.access.includes(`max-width:${width}px`),`Missing ${width}px breakpoint`);
 assert(/max-width:\s*480px/.test(css.base),'App is not capped to portrait width');
 assert(/100dvh/.test(css.base),'Dynamic viewport height missing');
}

// Safe areas must reach app, battle panel, cut-ins, Codex, Discord, and title/end surfaces.
const safeSource=Object.values(css).join('\n');
for(const token of ['safe-area-inset-top','safe-area-inset-bottom','safe-area-inset-left','safe-area-inset-right']) assert(safeSource.includes(token),`Missing ${token}`);
assert(/action-help-overlay[\s\S]*safe-area-inset-bottom/.test(css.battle),'Combat Codex ignores bottom safe area');
assert(/discord[\s\S]*safe-area-inset-bottom/.test(css.discord),'Discord ignores bottom safe area');

// Touch floors and one-thumb controls.
assert(/\.actions button \{[\s\S]*?min-height:\s*44px/.test(css.battle),'Main actions below 44px');
assert(/\.utility-btn\{[^}]*min-height:44px/.test(css.battle+css.access)||/\.utility-btn\{min-height:44px!important/.test(css.access),'Utility actions below 44px');
assert(/battle-cutin-continue\{min-height:44px!important/.test(css.access),'Cut-in continue below 44px');
assert(/action-help-close\{min-height:44px!important/.test(css.access),'Codex close below 44px');
assert(/btn-audio-toggle\{min-width:44px;min-height:44px/.test(css.access),'Audio target below 44px');

// Standard four-action layout at phone widths.
GAME.initGame();
Object.assign(GAME.player.unlocked,{trace:true,dismantle:true,dismantleNamed:true,cleave:true,web:true,furnace:true,hellstep:true});
GAME.furnaceSaturation=3; GAME.screen='battle'; GAME.currentEncounterKey='dross_overtime';
let actionHtml=renderActions();
for(const label of ['SEVER: DISMANTLE','SEVER: CLEAVE','SEVER: WEB','OPEN']) assert(actionHtml.includes(label),`Missing action ${label}`);
assert(actionHtml.includes('btn-furnace-open')&&actionHtml.includes('FURNACE READY')&&(actionHtml.match(/furnace-pip on/g)||[]).length===3,'Ready Furnace did not transform into a lit OPEN button with three aperture pips');
assert(!actionHtml.includes('REFUSE'),'Late Refuse leaked into phone grid');
assert((actionHtml.match(/<button/g)||[]).length===4,'Standard grid is not exactly four actions');

// Partial Veil must show Interception pips and partial target AR; pre-unlock Furnace must read as residue, not a missing button.
GAME.initGame();GAME.player.unlocked.web=true;GAME.player.unlocked.trace=true;GAME.player.unlocked.dismantle=true;GAME.player.unlocked.dismantleNamed=true;GAME.somnusManifested=true;GAME.veilHudLevel=1;GAME.furnaceSaturation=3;
let partialParty=renderParty();assert(/guard-pip[^>]*partial/.test(partialParty)&&!partialParty.includes('veil-intercept-wave'),'Interception label rendered without visible partial pips');
assert(partialParty.includes('CUT ASH')&&partialParty.includes('APERTURE UNCLAIMED')&&!partialParty.includes('FURNACE'),'Pre-unlock Furnace meter exposes an unusable named action');
assert((partialParty.match(/furnace-pip on/g)||[]).length===3&&!/[◆◇]/.test(partialParty),'Cut Ash did not use its dedicated aperture-pip language');
GAME.startBattle('act2_battle1');GAME.veilHudLevel=1;assert(/enemy-ar partial/.test(renderEnemies())&&/PRESENCE/.test(renderEnemies()),'Partial Ypsilon AR readout is unreachable');

// Black Flash ring and Zone state.
GAME.player.unlocked.blackFlash=true;GAME.worldFlags.blackFlashAwakened=true;GAME.blackFlashWindowActive=true;GAME.blackFlashTutorialWindow=false;GAME.blackFlashWindowDuration=2800;
let bf=renderBlackFlashWindow();
assert(/bf-ring outer/.test(bf)&&/bf-ring inner/.test(bf)&&/TAP THE CONVERGENCE/.test(bf),'Black Flash ring markup missing');
assert(/width:78vw/.test(css.battle)&&/max-width:380px/.test(css.battle),'Black Flash ring not viewport-scaled');
GAME.blackFlashWindowActive=false;GAME.blackFlashZoneTurns=3;GAME.blackFlashStreak=2;GAME.veilHudLevel=2;
assert(/IN THE ZONE · 120% · STREAK 2 · NEXT 38%/.test(renderParty()),'Zone strip missing or incorrect');

// Graveframe composition and phone breakpoint.
GAME.initGame();GAME.screen='battle';GAME.currentEncounterKey='act5_hound_battle';GAME.coffinState={active:true,control:2,collateral:1};GAME.somnusManifested=true;GAME.selectedEnemy={name:'Hound',dead:false};
let grave=renderBattle();
for(const part of ['graveframe-mode','graveframe-header','graveframe-stage','CONTROL','COLLATERAL','ANCHOR','STEER','LET HIM']) assert(grave.includes(part),`Graveframe missing ${part}`);
assert(/@media\(max-width:390px\)[^{]*\{[^}]*\.graveframe-stage/.test(css.battle),'Graveframe 390px composition rule missing');

// Omnis fit contracts: compact phone/short-height rules plus internal scrolling.
assert(/@media \(max-width:390px\)/.test(omnis),'Omnis narrow-phone rule missing');
assert(/@media \(max-height:700px\)/.test(omnis),'Omnis short-height rule missing');
assert(/\.notes\{[^}]*overflow-y:auto[^}]*min-height:0/.test(omnis),'Omnis notes cannot absorb vertical overflow');
assert(!/@import|fonts\.googleapis/.test(omnis),'Omnis has external dependency');

// First interaction audio unlock contract.
assert(/function unlockSosaAudioOnce/.test(index),'Global first-interaction audio unlock missing');
assert(/addEventListener\('pointerdown',\s*unlockSosaAudioOnce/.test(index),'Pointer audio unlock missing');
assert(/addEventListener\('keydown',\s*unlockSosaAudioOnce/.test(index),'Keyboard audio unlock missing');
assert(/AUDIO\.resume\(\)/.test(index),'Audio unlock does not resume context');

// Functional 520 ms hold simulation and click suppression.
const handlers={};let timerQueue=[];let buttonEnabled=true;let prevented=false,stopped=false;
const fakeButton={className:'btn-web',getAttribute(n){return n==='data-action-name'?'SEVER: WEB':''},addEventListener(type,fn){handlers[type]=fn}};
app.querySelectorAll=()=>buttonEnabled?[fakeButton]:[];
global.setTimeout=(fn,ms)=>{timerQueue.push({fn,ms});return timerQueue.length};global.clearTimeout=()=>{};
GAME.initGame();GAME.screen='battle';bindEvents();
assert(handlers.pointerdown&&handlers.click,'Hold listeners not bound');
handlers.pointerdown();const hold=timerQueue.find(t=>t.ms===520);assert(hold,'520ms timer missing');
buttonEnabled=false;hold.fn();
assert(GAME.actionHelp&&GAME.actionHelp.title==='SEVER: WEB','Hold did not open Combat Codex');
handlers.click({preventDefault(){prevented=true},stopImmediatePropagation(){stopped=true}});
assert(prevented&&stopped,'Held release did not suppress action click');

// Audiovisual presentation contracts.
const audioSource=fs.readFileSync(path.join(root,'js/audio.js'),'utf8');
assert(/battle:\s*8\.0/.test(audioSource)&&/battle_boss:\s*9\.6/.test(audioSource)&&/_scheduleBattleForm/.test(audioSource),'Battle music still uses a short repeating phrase');
assert(/case 'story':[\s\S]*?gain:0\.27/.test(audioSource)&&/case 'story_cold':[\s\S]*?gain:0\.24/.test(audioSource),'VN music profile was not raised');
assert(/speech-text/.test(css.story)&&/thought-text/.test(css.story)&&/speaker-narrator/.test(css.story)&&/speaker-entity/.test(css.story),'VN language channels lack distinct typography');
assert(/void-default::before/.test(css.effects)&&/void-room::before/.test(css.effects)&&/void-transit::before/.test(css.effects)&&/void-coffin::before/.test(css.effects),'Placeholder environments lack location silhouettes');
assert(/battle-cutin\.is-new/.test(css.battle)&&/somnus-wrap::before/.test(css.battle),'Cinematic cut-in/Somnus presentation missing');
assert(!/class="somnus-aura"/.test(fs.readFileSync(path.join(root,'js/render.js'),'utf8')),'Detached white Somnus eye overlay returned');
const battleSource=fs.readFileSync(path.join(root,'js/game-battle.js'),'utf8'),fxSource=fs.readFileSync(path.join(root,'js/fx.js'),'utf8');
assert(/3400[\s\S]*?2000[\s\S]*?2400[\s\S]*?2800/.test(battleSource)&&/hasBlackFlashAwakened/.test(battleSource),'Longer story-gated Black Flash windows missing');
assert(/fx-black-flash-freeze/.test(css.battle)&&/fx-black-flash-cut/.test(css.battle)&&/fx-zone-ignition/.test(css.battle),'Dedicated Black Flash convergence FX missing');
assert(/fx-dismantle-lane/.test(css.effects)&&/fx-auto-cut-lane/.test(css.effects)&&/spawnTargetCut/.test(fxSource),'Readable Dismantle/auto-slash target travel missing');
assert(/getBoundingClientRect/.test(fxSource)&&/data-enemy-index/.test(fs.readFileSync(path.join(root,'js/render.js'),'utf8')),'Slash FX still estimates target position instead of measuring the enemy card');
assert(/fx-vn-cold/.test(css.effects)&&/playSceneCue/.test(fxSource),'VN scene-cue visual FX missing');
const enemySource=fs.readFileSync(path.join(root,'js/game-enemies.js'),'utf8');
assert(/enemyPhaseWatchdogTimer/.test(enemySource)&&/VEIL RECOVERY/.test(enemySource)&&/Enemy intent failed/.test(enemySource),'Enemy phase lacks real-browser watchdog/exception recovery');
assert(/kessler-party-wrap/.test(css.battle)&&/persistent-blue-bracket/.test(css.battle),'Persistent Kessler party/bracket CSS missing');
assert(/\.furnace-pip/.test(css.battle)&&/\.btn-furnace-open/.test(css.battle)&&/furnace-open-button/.test(css.battle),'Dedicated Furnace pip/OPEN glow CSS missing');
for(const cls of ['entity-nifl','entity-relay','entity-atlas','entity-overtime','entity-anchor','entity-loadbearer'])assert(css.battle.includes('.'+cls),`Missing bespoke structural CSS placeholder ${cls}`);
assert(/ce-svg/.test(css.battle)&&/svg-route-flow/.test(css.battle),'Structural enemies lack higher-fidelity SVG styling');
for(const family of ['Newsreader','IBM Plex Sans','IBM Plex Sans Condensed','IBM Plex Mono','Barlow Condensed','Cormorant Garamond','Cinzel'])assert(css.base.includes("font-family:'"+family+"'"),`Missing local @font-face ${family}`);
assert(!/https?:\/\//.test(css.base),'Base CSS font loading is not offline');
assert(/speaker-profile-sosa \.story-text \.prose-text\.narration-text[\s\S]*?font-family:var\(--font-serif\)/.test(css.story),'Sosa prose is not cast to Newsreader');
assert(/speaker-profile-sosa \.story-text \.speech-text[\s\S]*?font-family:var\(--font-sans\)/.test(css.story),'Sosa direct speech is not cast to IBM Plex Sans');
assert(/speaker-profile-pall[\s\S]*?font-family:var\(--font-cold\)/.test(css.story)&&/speaker-profile-archon[\s\S]*?font-family:var\(--font-formal\)/.test(css.story),'Entity accent font casting missing');
for(const profile of ['pall','knell','spall','slag','archon','egregore','kessler','utica','goth'])assert(css.story.includes('.story-box.speaker-profile-'+profile),`Missing speaker typography profile ${profile}`);
assert(/discord-messages-area\{padding-bottom:88px/.test(css.discord),'Discord advance hint can overlap the final message');
assert(/void-stairwell/.test(css.effects)&&/void-bus/.test(css.effects)&&/void-bedroom-frost/.test(css.effects),'Scene-specific stairwell/bus/bedroom environment styling missing');
assert(/fx-enemy-pall/.test(css.effects)&&/fx-enemy-knell/.test(css.effects)&&/fx-enemy-spall/.test(css.effects)&&/fx-death-structural/.test(css.effects),'Family-specific enemy attack/death FX missing');
assert(/battle-context/.test(css.battle)&&/context-archon_fight/.test(css.battle)&&/context-dross_chime/.test(css.battle),'Battle fields lack encounter-specific environmental silhouettes');
const renderSource=fs.readFileSync(path.join(root,'js/render.js'),'utf8');
assert(/TERM_GLOSSARY/.test(renderSource)&&/TERM_INTRO_SCENES/.test(renderSource)&&/gloss-term/.test(css.story),'Authored first-read glossary system missing');
assert(/querySelectorAll\('\.gloss-term\[data-term\]'\)/.test(renderSource)&&/}, 520\)/.test(renderSource)&&/term-help-sheet/.test(css.story),'520ms held glossary inspection missing');
assert(/fx-battle-curtain/.test(css.effects)&&/battle-curtain-handoff/.test(css.effects)&&/handoffDelay[\s\S]*?560/.test(fs.readFileSync(path.join(root,'js/game-battle.js'),'utf8')),'Battle transition lacks an opaque midpoint handoff');
assert(/victory-banter/.test(css.title)&&/DATA\.victoryBanter/.test(fs.readFileSync(path.join(root,'js/data/battle-dialogue.js'),'utf8')),'Victory exchange presentation missing');

console.log(JSON.stringify({widths:[360,390,430,480],responsiveContracts:'pass',safeAreas:'pass',touchTargets:'pass',blackFlash:'pass',graveframe:'pass',omnis:'pass',audioUnlock:'pass',codexHold:'pass',cutInStability:'pass',vnChannels:'pass',longFormBattleAudio:'pass',environmentPlaceholders:'pass',battleHandoff:'pass',victoryBanter:'pass',vnCueFx:'pass',targetCutFx:'pass',blackFlashFx:'pass',partialVeilAr:'pass',interceptionPips:'pass',residueLabel:'pass',enemyPhaseRecovery:'pass',persistentKessler:'pass',structuralPlaceholders:'pass',svgEnemyDetail:'pass',measuredSlashTarget:'pass',fontReadability:'pass',localWebfonts:'7 families',vnFontCascade:'pass',speakerProfiles:'pass',discordHintClearance:'pass',stairwellPlate:'pass',busBedroomPlates:'pass',enemyFamilyFx:'pass',battleContextDepth:'pass',firstReadGlossary:'pass',furnaceOpenButton:'pass',physicalDeviceStillRequired:true},null,2));
