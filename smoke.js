/* Dependency-free structural/runtime smoke test. Run: node tests/smoke.js */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const app = {
    innerHTML: '', onclick: null, style: {}, offsetHeight: 0,
    classList: { add() {}, remove() {} }, insertAdjacentHTML() {}
};
global.window = global;
window.matchMedia = () => ({ matches: false });
global.localStorage = { getItem() { return null; }, setItem() {}, removeItem() {} };
global.document = {
    getElementById(id) { return id === 'app' ? app : null; },
    querySelector() { return null; }, querySelectorAll() { return []; },
    createElement(tag) { return { tagName: tag, style: { setProperty() {} }, classList: { add() {}, remove() {} }, appendChild() {}, removeChild() {}, parentNode: null }; },
    body: { appendChild() {} }, head: { appendChild() {} }
};
global.setInterval = () => 1;
global.clearInterval = () => {};
global.setTimeout = (fn) => { fn(); return 1; };
global.clearTimeout = () => {};
const scripts = [
    'js/data/core.js', 'js/data/act1.js', 'js/data/act2.js', 'js/data/act3.js',
    'js/data/act4.js', 'js/data/act5.js', 'js/data/act6.js', 'js/data/battle-dialogue.js',
    'js/audio.js', 'js/fx.js', 'js/game-core.js', 'js/game-battle.js',
    'js/game-enemies.js', 'js/game-bosses.js', 'js/game-states.js', 'js/render.js'
];
for (const file of scripts) vm.runInThisContext(fs.readFileSync(path.join(root, file), 'utf8'), { filename: file });
for (const key of Object.keys(AUDIO)) if (typeof AUDIO[key] === 'function') AUDIO[key] = () => {};
for (const key of Object.keys(FX)) if (typeof FX[key] === 'function') FX[key] = () => {};
function assert(value, message) { if (!value) throw new Error(message); }

GAME.initGame();
for (const [key, scene] of Object.entries(DATA.scenes)) {
    const text = scene.text || '';
    assert(text.length <= 340, `Phone text budget exceeded (${text.length}): ${key}`);
    assert((text.match(/\(/g)||[]).length === (text.match(/\)/g)||[]).length, `Parenthetical split/imbalance: ${key}`);
    assert(!/\n\n\s+/.test(text), `Accidental paragraph indentation: ${key}`);
    assert(!text.includes("'''"), `Broken apostrophe sequence: ${key}`);
    GAME.currentScene = scene;
    GAME.screen = scene.mode === 'phone' ? 'phone' : 'story';
    render();
    assert(app.innerHTML, `Scene rendered empty: ${key}`);
}
const serializedCanon = JSON.stringify({ scenes: DATA.scenes, roster: DATA.roster, skills: DATA.skills });
assert(!serializedCanon.includes('Albany'), 'Retired Albany error returned');
assert(!serializedCanon.includes('realgz') && !serializedCanon.includes('bender_ysl'), 'Retired Gz identity returned');
assert(!/Coffin Pilot|COFFIN PILOT/.test(serializedCanon), 'Retired Graveframe name returned');
assert(!/\bChime\b|\bCHIME\b/.test(Object.values(DATA.scenes).map(s => s.text || '').join('\n')), 'Retired public Dross name Chime returned');
assert(DATA.enemies.chime.name === 'Knell' && DATA.enemies.chime_relay.name === 'Knell Relay', 'Internal chime compatibility keys do not render as Knell');
assert(!/have a spare room|photos? of the spare room|lived in (?:her|a) spare room|into (?:her|a) spare room/i.test(serializedCanon), 'False Apt 3 spare-room geometry returned');
assert(/one bedroom, one living room, one bathroom, one kitchen/i.test(DATA.scenes.act2_s2__p3.text), 'Apt 3 four-room geometry is not explicit');
assert(/share my bed or take the couch/i.test(DATA.scenes.act1_utica_girl_offer ? DATA.scenes.act1_utica_girl_offer.text || '' : serializedCanon), 'Utica offer does not establish bed/couch arrangement');
assert(DATA.scenes.act2_bus_meet && /reaches the curb/i.test(DATA.scenes.act2_bus_meet.text), 'Utica curb meeting is missing before Apt 3');
assert(/second floor/i.test(DATA.scenes.act2_stair_warning.text) && /second locked door/i.test(DATA.scenes.act2_stair_narration.text), 'Apt 3 second-floor two-door access is not explicit');
assert(/9 AM/.test(DATA.scenes.act4_s1.text) && /5:00/.test(DATA.scenes.act4_s2.text) && /April afternoon/i.test(DATA.scenes.act4_s2.text), 'TOMRA 9 AM–5 PM shift timing is inconsistent');
assert(!/overnight sorters|night shift still beating/i.test(serializedCanon), 'Retired TOMRA overnight schedule returned');
assert(!/line in my car|call from (?:my|the) car/i.test(serializedCanon), 'Sosa was incorrectly given a car');
for (const key of ['act4_archon_quiet','act4_after_elias_walk','act4_erased_days','act4_utica_fraying','act5_one_word']) {
    assert(DATA.scenes[key], `Roadmap consequence scene missing: ${key}`);
}
assert(/^CHAPTER 6/.test(DATA.scenes.act6_silence_receiving.title) && /^CHAPTER 6/.test(DATA.scenes.act6_teaser_end.title), 'Chapter 6 opening is mislabeled as credits/teaser');
assert(!/POSTSCRIPT|NEXT \/\/ CHAPTER 6/.test(DATA.scenes.act6_silence_receiving.title + DATA.scenes.act6_teaser_end.title), 'Chapter 6 is still framed as post-credits material');
assert(DATA.scenes.act4_kessler_types && /Type-II:\s*Molt/i.test(DATA.scenes.act4_kessler_types.text), 'Egregore TYPE/Molt ladder is missing from Kessler terminology scene');
assert(/Nifl/.test(DATA.scenes.act4_kessler_types.text) && /Atlas/.test(DATA.scenes.act4_kessler_types.text) && /Relay/.test(DATA.scenes.act4_kessler_types.text) && /Overtime/.test(DATA.scenes.act4_kessler_types.text), 'Dross Molt field names missing from terminology scene');
assert(!/Nexus|Sovereign|Overwrite|Stillwinter|Deadweight Crown|Blackshift/.test(DATA.scenes.act4_kessler_types.text), 'Retired synthetic taxonomy names returned');
GAME.worldFlags = { act5Coffin: { collateral: 0 } };
GAME.gotoScene('act5_s5');
const controlledAftermath = GAME.currentScene.text;
GAME.worldFlags = { act5Coffin: { collateral: 3 } };
GAME.gotoScene('act5_s5');
const collateralAftermath = GAME.currentScene.text;
assert(controlledAftermath !== collateralAftermath && /COLLATERAL: 3/.test(collateralAftermath), 'Graveframe Collateral did not persist into narrative aftermath');
assert(collateralAftermath.length <= 340, 'Dynamic Graveframe aftermath exceeds phone budget');
GAME.worldFlags = { act5Coffin: { collateral: 0 } };
GAME.gotoScene('act6_collateral_record');
const civicLow = GAME.currentScene.text;
GAME.worldFlags = { act5Coffin: { collateral: 4 } };
GAME.gotoScene('act6_collateral_record');
const civicHigh = GAME.currentScene.text;
assert(civicLow !== civicHigh && /One tenant needed stitches/.test(civicHigh) && /COLLATERAL: 4/.test(civicHigh), 'Chapter 6 civic Collateral did not persist');
assert(civicHigh.length <= 340, 'Dynamic civic Collateral text exceeds phone budget');
GAME.worldFlags = {};
GAME.gotoScene('act4_joint_after');
const atlasSafe = GAME.currentScene.text;
GAME.worldFlags = { atlasFurnaceUsed:true };
GAME.gotoScene('act4_joint_after');
const atlasFast = GAME.currentScene.text;
assert(atlasSafe !== atlasFast && /Fast was not the same as safe/.test(atlasFast), 'Atlas Furnace consequence did not persist into story');
GAME.worldFlags = { overtimeFurnaceUsed:true }; GAME.gotoScene('act4_overtime_after');
assert(/sends them home without pay/.test(GAME.currentScene.text), 'Overtime Furnace consequence missing');
GAME.worldFlags = { archonFurnaceUsed:true }; GAME.gotoScene('act4_archon_quiet');
assert(/two apartments are red-tagged/.test(GAME.currentScene.text), 'Archon Furnace consequence missing');
GAME.worldFlags = { censorFurnaceUsed:true }; GAME.gotoScene('act4_s9__p4__tap2');
assert(/coffee cup has melted/.test(GAME.currentScene.text), 'Censor Furnace consequence missing');
assert(DATA.encounters.kessler_joint_hunt[0] === 'spall_atlas', 'April joint cleanup is not the Atlas Molt fight');
assert(DATA.scenes.act3_atlas_seed && /load balancer for trauma/.test(DATA.scenes.act3_atlas_seed__p2.text), 'Atlas recurrence is not seeded in Sosa language');
assert(DATA.scenes.act3_gz_boundaries && /friendship is not a contract/.test(DATA.scenes.act3_gz_boundaries.messages[3].text), 'Gz boundary stakes scene missing');
assert(JSON.stringify(DATA.roster.top_ranked_gz.memberNames) === JSON.stringify(['Sosa','Bender','Meki','YSL']), 'Top Ranked Gz incorrectly uses numerical ranks');
assert(!Object.values(DATA.roster).some(r => /Top Ranked Gz #\d/.test(r.role || '')), 'Gz member role incorrectly implies hierarchy');
assert(!/rank revoked|rank under review|rank rule|#1 employment|#\d is not on-call/.test(serializedCanon), 'Rank-based Gz behavior returned');
assert(!/Ohio|Columbus|arrested|locked up/i.test(DATA.scenes.act2_s4d_dms__p2.text), 'Sosa knows Goth Baddie arrest details before December 28');
const gothReturnText=DATA.scenes.act2_s5b.messages.filter(m=>String(m.time||'').startsWith('12/28')).map(m=>m.text).join(' ');
assert(/columbus cops pulled me off the jet bridge/i.test(gothReturnText)&&/i got a felony/i.test(gothReturnText)&&/staying in ohio/i.test(gothReturnText), 'December 28 felony/Ohio explanation is incomplete');
assert(/i missed you/i.test(gothReturnText)&&/i'm just glad you're here/i.test(gothReturnText)&&!/where the fuck were you/i.test(gothReturnText),'Goth reunion is accusatory instead of relief-led');
const postReleaseGothLocations=[DATA.scenes.act2_s9__p2.text,DATA.scenes.act4_s1__p4.text,DATA.scenes.act6_silence_receiving.text].join(' ');
assert((postReleaseGothLocations.match(/Ohio/g)||[]).length===3&&!/West Virginia/.test(postReleaseGothLocations),'Goth Baddie incorrectly returns to West Virginia after the Ohio felony');
for(const scene of Object.values(DATA.scenes))if(/The earbuds will .* later|Later I('|’)ll learn/i.test(scene.text||''))assert(scene.retrospective===true,`Future-aware Sosa narration is not marked retrospective: ${scene.key}`);
assert(DATA.scenes.act1_end__tap2.nextAction.includes('act1_bus_hour0')&&DATA.scenes.act1_bus_hour48.nextAction.includes('act2_s1')&&/Forty-eight hours after Dallas/.test(DATA.scenes.act1_bus_hour48.text),'Exact 48-hour Dallas-to-Utica bridge is not routed');
GAME.initGame();
const kesslerText = Object.entries(DATA.scenes).filter(([k]) => k.startsWith('act4_')).map(([,s]) => s.text || '').join('\n');
assert(!/jaw-mask|jaw-filter|half-mask|chrome mask/i.test(kesslerText), 'Kessler jaw hardware contradicts sprite');
assert(/steel-gray hair/i.test(kesslerText) && /sunglasses/i.test(kesslerText) && /red tie/i.test(kesslerText), 'Kessler sprite-grounded appearance missing');
assert(!DATA.skills.endure && !GAME.player.unlocked.endure, 'Endure incorrectly exists as a technique');
const namingChecks = {
    act2_name_dismantle: /stealing it[\s\S]*Sever: Dismantle/i,
    act3_nifl_web: /move list[\s\S]*Sever: Web/i,
    act4_s8_hellstep_name: /panic names[\s\S]*Hellstep/i,
    act4_s8__p3: /homework I’m copying[\s\S]*Sever: Cleave/i,
    act4_name_furnace: /Furnace \(Open\)[\s\S]*anime move list/i,
    act3_s6_call__tap2: /System Call[\s\S]*dramatic name/i,
    act5_name_graveframe: /Graveframe[\s\S]*mecha form/i
};
for (const [key, pattern] of Object.entries(namingChecks)) assert(DATA.scenes[key] && pattern.test(DATA.scenes[key].text), `Sosa does not self-consciously name technique in ${key}`);
// act3_s4–s7 are compatibility keys now routed after Kessler's April introduction.
const preKesslerText = Object.entries(DATA.scenes).filter(([k]) => k.startsWith('act1_') || k.startsWith('act2_') || (k.startsWith('act3_') && !/^act3_s[4-7]/.test(k))).map(([,s]) => [s.title,s.speaker,s.text].join(' ')).join('\n');
assert(!/\b(Dross|Pall|Knell|Spall|Slag|Archon|Formalcraft|Pneuma|Circuits|Mystic Code|Omnis|Egregore|Censor)\b|Validation Engine/.test(preKesslerText), 'Formal Egregore terminology leaked before Kessler');
assert(!/4 little pips|STEAL HEAT|one hundred/.test(preKesslerText), 'Veil revealed exact mechanics too early');
assert(!/\bcleanup\b/i.test(preKesslerText), 'Institutional cleanup language leaked into early Sosa/narration');
GAME.veilLearnedCensor=false;
assert(getEncounterDisplayName('act1_battle1')==='COLD PACK'&&getEncounterDisplayName('act1_battle2')==='COLD PRESSURE','Early encounter banner leaked formal Pall taxonomy');
assert(/Everything else fades when I commit/.test(DATA.scenes.act2_s6__p3.text),'False Eyes lack a narrow-focus narrative rule');
const returnChat = DATA.scenes.act2_s5b.messages;
assert(returnChat.some(m => String(m.time).startsWith('12/28/2025')), 'Goth Baddie return is not late December');
assert(!returnChat.some(m => String(m.time).startsWith('11/28/2025')), 'Obsolete November return messages remain');
assert(DATA.roster.velvetcoffin.role === '', 'Internal Anchor terminology leaked into Discord profile');
assert(getStorySpeakerProfile('The Cold')==='pall'&&getStorySpeakerProfile('Wire-Jaw')==='knell'&&getStorySpeakerProfile('Concrete Thing')==='spall'&&getStorySpeakerProfile('Work Heap')==='slag'&&getStorySpeakerProfile('The Condemned Witness')==='archon'&&getStorySpeakerProfile('Elias Kessler')==='kessler'&&getStorySpeakerProfile('Utica Girl')==='utica','Speaker-specific VN typography profiles are incomplete');
const rosterDmKeys=['act2_roster_night_list','act2_roster_mocha','act2_roster_honey','act2_roster_cloud','act2_roster_night_after'];
for(const key of rosterDmKeys)assert(DATA.scenes[key],`Private-DM expansion missing ${key}`);
const privateDmText=rosterDmKeys.map(k=>JSON.stringify(DATA.scenes[k])).join(' ');
assert(/u said monday/.test(privateDmText)&&/does velvet know/.test(privateDmText)&&/miso/.test(privateDmText)&&/Every version of me is real/.test(privateDmText),'Private DMs do not show memory, overlap, reciprocal care, and self-awareness');
assert(!/donor|mana battery|tributary count/i.test(privateDmText),'Private DMs reduce women to Validation resources');
const shiftFlirt=DATA.scenes.act4_goth_shift_dm.messages.map(m=>m.text).join(' ');
assert(/worst thing you sorted today/.test(shiftFlirt)&&/missed hearing you complain about boring shit/.test(shiftFlirt)&&!/camera lower|leave the vest on|tape is a prop/.test(shiftFlirt),'Work-vest exchange repeats the later camera-control scene instead of mundane intimacy');
assert(/Ice is mortar[\s\S]*Phone thing is the DJ/.test(DATA.scenes.act4_rescue_crossfeed_joke.text)&&/Use your Web/.test(DATA.scenes.act4_rescue_crossfeed_kessler.text),'Mixed Dross Crossfeed lacks narrative buildup/counterplay');
assert(/follow every place carrying the same cold/.test(DATA.scenes.act3_nifl_web.text)&&/WEBBED \/\/ 2 EXCHANGES/.test(DATA.scenes.act3_web_readout.text)&&/CUT ASH/.test(DATA.scenes.act3_web_residue.text),'Web lacks creation/status/residue narrative explanation');
assert(/Dismantle and Cleave leave one layer/.test(DATA.scenes.act4_joint_residue.text)&&/unlock:furnace/.test(DATA.scenes.act4_name_furnace.nextAction),'Furnace lacks three-layer explanation or narrative unlock');
assert(DATA.scenes.act1_end__tap2.nextAction.startsWith('setDebt:20')&&DATA.scenes.act3_post_grief__p2.nextAction.startsWith('setDebt:25')&&DATA.scenes.act3_march_sosa.nextAction.startsWith('setDebt:20'),'Long time skips do not settle Debt to authored checkpoints');
const sosaBattleVoice=Object.values(DATA.battleDialogue).flatMap(cfg=>cfg.sosa||[]).join(' ')+Object.values(DATA.victoryBanter||{}).flatMap(cfg=>cfg.sosa||[]).join(' ');
assert(/almost hot enough to work/.test(sosaBattleVoice)&&/fake competent/.test(sosaBattleVoice)&&/emotionally load-bearing/.test(sosaBattleVoice),'Sosa battle voice lacks desire, false confidence, or self-deprecation');
for (const key of ['act2_utica_future_forms','act2_utica_library','act3_utica_orientation','act4_utica_progress']) {
    assert(DATA.scenes[key], `Utica Girl independent trajectory missing: ${key}`);
}
assert(/peer-support|peer support/i.test(DATA.scenes.act2_utica_future_forms.text + DATA.scenes.act3_utica_orientation.text), 'Utica Girl peer-support goal is not established');
assert(!/never asked how her day/i.test(serializedCanon), 'Obsolete absolute Utica Girl guilt line returned');
for (const key of ['act1_s1c','act1_s2_dms']) {
    const groupPreview = DATA.scenes[key].messages.find(m => m.handle === 'top_ranked_gz');
    assert(groupPreview && groupPreview.preview === 'YSL: vegas trip is crazy', `Group preview is not the latest single message: ${key}`);
}
for (const key of Object.keys(DATA.encounters)) {
    GAME.initGame();
    GAME.currentScene = DATA.scenes.act1_s1;
    GAME.startBattle(key);
    assert(GAME.screen === 'battle', `Battle did not open: ${key}`);
    render();
    assert(app.innerHTML.includes('battle-psy'), `Psychedelic field missing: ${key}`);
}
for (const key of ['kessler_rescue_swarm','kessler_joint_hunt','dross_overtime','archon_fight']) {
    const ally = DATA.alliedSupport && DATA.alliedSupport[key];
    assert(ally && ally.ally === 'Elias Kessler' && ally.cadence === 2 && ally.damage > 0, `Invalid allied-support metadata: ${key}`);
}
GAME.initGame();GAME.startBattle('kessler_joint_hunt');
assert(renderParty().includes('kessler-party-wrap')&&renderParty().includes('censor_scout.png'),'Kessler is not standing on the party side');
const jointVisuals=renderEnemies();
assert((jointVisuals.match(/persistent-blue-bracket/g)||[]).length===0,'Blue Brackets appeared before Kessler actually bracketed a target');
GAME.battleTurnCount=2;GAME.applyAlliedSupport();const bracketedVisuals=renderEnemies();
assert((bracketedVisuals.match(/persistent-blue-bracket/g)||[]).length===1,'Kessler’s applied bracket did not persist on its target');
assert((jointVisuals.match(/entity-atlas/g)||[]).length===1&&(jointVisuals.match(/entity-loadbearer/g)||[]).length===2&&!jointVisuals.includes('assets/spall.png'),'Atlas/load-bearers reused base Spall raster art');
for(const spec of [{k:'rime_nifl',c:'entity-nifl'},{k:'chime_relay',c:'entity-relay'},{k:'slag_overtime',c:'entity-overtime'}])assert(renderStructuralPlaceholder({originalKey:spec.k},false).includes(spec.c),`Missing structural placeholder ${spec.c}`);
assert(renderStructuralPlaceholder({originalKey:'anchor_archon',isAnchor:true},false).includes('entity-anchor'),'Material anchor lacks dedicated structural placeholder');
assert(getEnemyAssetKey({originalKey:'chime'}) === 'chime', 'Electronic heap placeholder is not mapped to Knell');
assert(getEnemyAssetKey({originalKey:'spall'}) === 'spall', 'Shard-beast placeholder is not mapped to Spall');
assert(getEnemyAssetKey({originalKey:'slag'}) === 'slag', 'Cracked industrial heap placeholder is not mapped to Slag');
assert(getEnemyAssetKey({originalKey:'rime_nifl'}) === 'rime', 'Icy placeholder is not mapped to Pall/Nifl');
assert(getSpeakerAvatar({},'Concrete Thing','#fff').includes('assets/spall.png')&&getSpeakerAvatar({},'Wire-Jaw','#fff').includes('assets/chime.png'),'VN portraits do not follow corrected Dross sprite semantics');
GAME.initGame();GAME.startBattle('act1_battle2');const variantEnemyHtml=renderEnemies();
assert(variantEnemyHtml.includes('enemy-variant-0')&&variantEnemyHtml.includes('enemy-variant-1')&&variantEnemyHtml.includes('enemy-variant-2'),'Same-family visual variants failed to render');
assert(getVoidVariant(DATA.scenes.act2_stair_narration) === 'void-stairwell', 'Apt 3 stairwell lacks its dedicated environment plate');
assert((DATA.scenes.act1_s4_somnus_text.text||'').length<240&&(DATA.scenes.act1_s4_somnus_visual.text||'').length<240,'Manifestation dialogue was not split for phone-height CG readability');
assert(getVoidVariant(DATA.scenes.act3_chime_base_seed) === 'void-signal', 'Base Knell CSS background placeholder missing');
assert(getVoidVariant(DATA.scenes.act3_relay_seed) === 'void-depot', 'Relay depot CSS background placeholder missing');
const battleCss = fs.readFileSync(path.join(root, 'css/battle.css'), 'utf8');
assert(/enemy-kind-rime_nifl[\s\S]*nifl-network-turn/.test(battleCss) && /enemy-kind-chime[\s\S]*signal-reticle/.test(battleCss), 'Ecology-specific CSS sprite treatments missing');
const battleUiSource = [fs.readFileSync(path.join(root,'js/render.js'),'utf8'), battleCss, fs.readFileSync(path.join(root,'css/effects.css'),'utf8'), fs.readFileSync(path.join(root,'js/game-battle.js'),'utf8')].join('\n');
assert(!/[👁👀🧿◉◎]/u.test(battleUiSource), 'Eye emoji/text glyph leaked into battle UI');
assert(!/[\u{1F300}-\u{1FAFF}]/u.test(battleUiSource), 'Emoji code point leaked into battle UI source');
assert(/fixation-eye-shape/.test(battleUiSource) && /clip-path:polygon/.test(battleCss), 'Fixation eye is not rendered as CSS art');
assert(/pointerdown/.test(battleUiSource) && /openActionHelp/.test(battleUiSource) && /}, 520\);/.test(battleUiSource) && /action-help-sheet/.test(battleCss), 'Touch hold Combat Codex is missing');
assert(/aria-disabled="true"/.test(actionButton('btn-web','WEB CD 1','LATTICE SETTLING','',true,false)), 'Cooldown action is not hold-inspectable');
assert(/fx-ally-bracket-lane/.test(battleUiSource) && /persistent-blue-bracket/.test(battleUiSource) && /kessler-party-wrap/.test(battleUiSource), 'Persistent Kessler party/bracket presentation missing');
const act3Source = fs.readFileSync(path.join(root, 'js/data/act3.js'), 'utf8');
assert(!/^\s{4}"act3_s4": \{/m.test(act3Source), 'Obsolete early-Archon scene definitions returned to act3.js');

// Raw Act 1 combat hides the event log; opening story cut-ins require acknowledgement.
GAME.initGame();
GAME.currentScene = DATA.scenes.act1_s4_run2__p5;
GAME.startBattle('tutorial_1');
assert(GAME.battleCutIn && GAME.battleCutIn.persistent && GAME.turnLock, 'Battle opener is missable or does not pause input');
render();
assert(!app.innerHTML.includes('YPSILON EVENT BUFFER'), 'Battle log leaked before Veil calibration');
GAME.dismissBattleCutIn();
assert(GAME.battleCutIn && GAME.battleCutIn.persistent && GAME.turnLock, 'Sosa pre-battle response did not follow enemy opener');
GAME.dismissBattleCutIn();
assert(!GAME.battleCutIn && !GAME.turnLock, 'Battle controls did not unlock after intro exchange');
GAME.battleCutIn={kind:'sosa',speaker:'Sosa',text:'Still here.',assetKey:'sosa',persistent:false};
const firstCutInFrame=renderBattleCutIn(), settledCutInFrame=renderBattleCutIn();
assert(firstCutInFrame.includes('is-new') && settledCutInFrame.includes('settled') && !settledCutInFrame.includes('is-new'), 'Battle cut-in entrance animation restarts on damage rerender');
GAME.battleCutIn={kind:'somnus',speaker:'',text:'The familiar moves.',assetKey:'somnus',persistent:false};
assert(renderBattleCutIn().includes('SOMNUS // MOVEMENT')&&!renderBattleCutIn().includes('>ENEMY<'),'Somnus movement cut-in mislabeled as enemy dialogue');
GAME.battleCutIn=null;
GAME.veilHudLevel = 1;
render();
assert(!app.innerHTML.includes('YPSILON EVENT BUFFER'), 'Partial Veil exposed the Omnis event log');
GAME.veilHudLevel = 2;
render();
assert(app.innerHTML.includes('YPSILON EVENT BUFFER'), 'Battle log did not unlock after Omnis exposure');

// Utility states do not displace the four-button Sever grid.
GAME.initGame();
GAME.currentEncounterKey='tutorial_1';GAME.tutorial.active = true;
assert(renderActions().includes('REFUSE')&&!renderActions().includes('UNNAMED CUT'), 'First Refusal should expose only Refuse');
GAME.currentEncounterKey='act1_battle1';GAME.tutorial.active = false;GAME.player.unlocked.dismantle = true;
assert(renderActions().includes('REFUSE')&&renderActions().includes('UNNAMED CUT'),'Post-manifest early combat lacks Refuse/Unnamed Cut agency');
GAME.player.unlocked.dismantleNamed = true;
GAME.player.unlocked.cleave = true;
GAME.player.unlocked.web = true;
GAME.player.unlocked.furnace = true;
GAME.player.unlocked.hellstep = true;
const severGridHtml = renderActions();
for (const name of ['SEVER: DISMANTLE','SEVER: CLEAVE','SEVER: WEB','FURNACE']) assert(severGridHtml.includes(name), `Main Sever grid missing ${name}`);
assert(!severGridHtml.includes('HELLSTEP') && !severGridHtml.includes('SYSTEM CALL'), 'Utility technique leaked into the main Sever grid');
assert(renderUtilityActions().includes('HELLSTEP') && !renderUtilityActions().includes('REFUSE'), 'Refuse persisted after Sosa learned to direct Somnus');
for (const action of ['SEVER: DISMANTLE','SEVER: CLEAVE','SEVER: WEB','FURNACE (OPEN)','HELLSTEP','SYSTEM CALL','REFUSE','ANCHOR','STEER','LET HIM']) {
    const help = getActionHelp(action, action === 'HELLSTEP' ? 'utility-hellstep' : '');
    assert(help && help.body && help.meta, `Combat Codex entry missing: ${action}`);
}
const lockedHelpButton = actionButton('btn-furnace-locked','FURNACE 0/3','BUILD SATURATION','GAME.playerFurnace();',true,false);
assert(/aria-disabled="true"/.test(lockedHelpButton) && /data-action-name="FURNACE 0\/3"/.test(lockedHelpButton) && !/ disabled/.test(lockedHelpButton), 'Locked action cannot receive hold inspection');
GAME.actionHelp = getActionHelp('SEVER: WEB','btn-web');
assert(renderActionHelp().includes('YPSILON VEIL') && renderActionHelp().includes('SEVER: WEB'), 'Held-focus field note failed to render');
GAME.actionHelp = null;

// First-read glossary terms highlight in their authored scene, remain inspectable later, and open a definition sheet.
GAME.initGame(); GAME.currentScene=DATA.scenes.act2_s4c__p4; GAME.screen='story'; render();
assert(app.innerHTML.includes('gloss-term first-read')&&app.innerHTML.includes('data-term="Ypsilon Veil"')&&app.innerHTML.includes('HOLD HIGHLIGHTED TERMS'),'Ypsilon first-read highlight missing');
GAME.currentScene=DATA.scenes.act2_s6__p3;render();assert(app.innerHTML.includes('gloss-term known-read'),'Known glossary term lost later inspection styling');
openTermHelp('Ypsilon Veil');assert(app.innerHTML.includes('term-help-sheet')&&app.innerHTML.includes('Attuned consumer earbuds'),'Held glossary definition failed to render');closeTermHelp();

// Retrospective Sosa must not look like present speech or present thought.
GAME.initGame(); GAME.currentScene=DATA.scenes.act2_s4c__p5; GAME.screen='story'; render();
assert(app.innerHTML.includes('speaker-retrospective') && app.innerHTML.includes('SOSA // LOOKING BACK'), 'Retrospective Sosa channel failed to render distinctly');

// Graveframe uses a distinct battle interface.
GAME.initGame();
GAME.currentScene = DATA.scenes.act5_s4__p3;
GAME.startBattle('act5_hound_battle');
render();
assert(app.innerHTML.includes('graveframe-mode') && app.innerHTML.includes('graveframe-header') && app.innerHTML.includes('graveframe-hud'), 'Distinct Graveframe UI missing');

// Results must render as a composed full-screen card rather than unstyled text at the top.
GAME.initGame();
GAME.currentEncounterKey = 'tutorial_1';
GAME.grantBattleReward();GAME.screen = 'win';
render();
assert(app.innerHTML.includes('victory-sigil') && app.innerHTML.includes('victory-stats') && app.innerHTML.includes('end-wrap'), 'Victory composition missing');
assert(app.innerHTML.includes('FIELD EXP +1')&&app.innerHTML.includes('BATTLE CONTINUATION')&&GAME.player.fieldExp===1,'Contextual victory reward/Field EXP failed to render');
assert(Object.keys(DATA.victoryBanter || {}).length === 22, 'Encounter victory banter coverage is incomplete');
assert(app.innerHTML.includes('victory-banter-line sosa') && app.innerHTML.includes('victory-banter-line somnus') && app.innerHTML.includes('THE SHADOW'), 'Early Sosa/shadow victory exchange failed to render without pre-naming Somnus');
for(const key of ['tutorial_1','act1_battle1','act1_battle2','tutorial_2'])assert(!/Somnus/.test(JSON.stringify({dialogue:DATA.battleDialogue[key]||{},banter:DATA.victoryBanter[key]||{}})),`Somnus name leaked in early battle copy: ${key}`);
for (const [encounter, banter] of Object.entries(DATA.victoryBanter || {})) {
    assert(banter.sosa && banter.sosa.length >= 2 && banter.somnus && banter.somnus.length >= 2, `Victory exchange lacks rotation: ${encounter}`);
}

// The standalone Omnis-OS iframe must remain dependency-free and syntactically valid.
const scanHtml = fs.readFileSync(path.join(root, 'cg_stats_scan.html'), 'utf8');
assert(!scanHtml.includes('@import') && !scanHtml.includes('fonts.googleapis'), 'Omnis-OS contains an external font dependency');
assert(scanHtml.includes('EX-CONFLICT ANALYSIS') && scanHtml.includes('CONTESTED TEXT') && scanHtml.includes('OPERATOR OVERRIDE NOT AUTHORIZED'), 'Omnis professional audit sections missing');
assert(scanHtml.includes("html:'Caster?'") && scanHtml.includes("html:'TYPE-0 IRREGULAR'") && !scanHtml.includes('CASTER? / IRREGULAR'), 'Omnis Class/Type split is incorrect');
assert(/\.r-ex\{[\s\S]*?box-shadow:[\s\S]*?filter:drop-shadow/.test(scanHtml), 'EX parameter glow styling missing');
assert(/\.skills\{display:grid;grid-template-columns:1fr 1fr/.test(scanHtml) && /el\.style\.display='flex'/.test(scanHtml), 'Omnis skill grades are not compact beside skill names');
assert(scanHtml.includes('MANY / DYNAMIC') && scanHtml.includes('High-cardinality attention graph') && !/11 MICRO-TRIBUTARIES|Eleven active attention-linked/.test(scanHtml), 'Omnis still reduces the immense roster to a small fixed count');
assert((scanHtml.match(/<i style="--y:/g) || []).length >= 12, 'Omnis attention graph lacks dense visual paths');
assert(/RECEIVER GRAPH: HIGH-CARDINALITY/.test(DATA.scenes.act4_s5_power.text) && !/TRIBUTARIES: 11/.test(DATA.scenes.act4_s5_power.text), 'Story audit still uses a tiny fixed roster count');
const scanScripts = [...scanHtml.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]).join('\n');
new vm.Script(scanScripts, { filename: 'cg_stats_scan.html:inline' });

const battleReturn = {
    tutorial_1:'act1_s4_post', act1_battle1:'act1_s4_postb', act1_battle2:'act1_s4_after_second',
    tutorial_2:'act1_s6', act2_alone_dross:'act2_alone_after', act2_battle1:'veil_react_full_hint', dross_chime:'act3_relay_after',
    dross_chime_base:'act3_chime_base_after', dross_nifl:'act3_nifl_after', dross_spall:'act2_spall_after', street_predator_enc:'act2_s7e', act3_grief_battle:'act3_s3b',
    dross_slag:'act4_slag_after', dross_overtime:'act4_overtime_after', kessler_rescue_swarm:'act4_rescue_after', kessler_joint_hunt:'act4_joint_after', act3_hunt_battle:'act3_resonance_aftermath', act3_hunt_battle2:'act3_second_hunt_after', act3_battle2:'act3_post_grief', archon_fight:'act3_s7',
    censor_enc:'veil_react_omnis', act5_hound_battle:'act5_s5'
};
let key = 'act1_s1';
const visited = new Set();
const battles = [];
let somnusNamedInStory = false;
for (let guard = 0; guard < 1000; guard++) {
    assert(!visited.has(key), `Scene cycle at ${key}`);
    visited.add(key);
    const scene = DATA.scenes[key];
    assert(scene, `Missing routed scene: ${key}`);
    const action = scene.nextAction || '';
    const namesSomnusHere = action.includes('nameSomnus');
    if (!somnusNamedInStory && !namesSomnusHere) assert(!/Somnus/.test(scene.text || ''), `Somnus named before naming scene: ${key}`);
    if (namesSomnusHere) somnusNamedInStory = true;
    const battle = [...action.matchAll(/startBattle\(["']([^"']+)/g)].at(-1);
    const go = [...action.matchAll(/gotoScene\(["']([^"']+)/g)].at(-1);
    if (battle) { battles.push(battle[1]); key = battleReturn[battle[1]]; continue; }
    if (action.includes('triggerAudit')) { key = 'act4_s5'; continue; }
    if (go) { key = go[1]; continue; }
    assert(action === 'gotoTitle', `Route ends unexpectedly at ${key}: ${action}`);
    break;
}
assert(visited.size === Object.keys(DATA.scenes).length, `Orphan scenes: ${Object.keys(DATA.scenes).filter(k => !visited.has(k)).join(', ')}`);
assert(battles.length === 22, `Expected 22 main-path battles, got ${battles.length}`);
assert(battles.indexOf('dross_spall') > battles.indexOf('street_predator_enc'), 'Spall is not the Act 2 final monster battle');
assert(battles.indexOf('act3_hunt_battle') > battles.indexOf('act3_battle2'), 'First deliberate hunt does not follow the grief surge');
assert(battles.indexOf('act3_hunt_battle2') > battles.indexOf('act3_hunt_battle'), 'Second mixed hunt is out of order');
assert(battles.indexOf('dross_chime_base') > battles.indexOf('act3_hunt_battle2'), 'Dedicated base Knell does not follow the hunt era');
assert(battles.indexOf('dross_slag') > battles.indexOf('dross_chime_base'), 'All four base Dross are not completed before Molt escalation');
assert(battles.indexOf('dross_nifl') > battles.indexOf('dross_slag') && battles.indexOf('dross_chime') > battles.indexOf('dross_nifl'), 'First Molts do not follow all base Dross in Nifl→Relay order');
assert(battles.indexOf('dross_chime') < battles.indexOf('kessler_rescue_swarm') && battles.indexOf('kessler_rescue_swarm') < battles.indexOf('kessler_joint_hunt') && battles.indexOf('kessler_joint_hunt') < battles.indexOf('dross_overtime') && battles.indexOf('dross_overtime') < battles.indexOf('archon_fight') && battles.indexOf('archon_fight') < battles.indexOf('censor_enc'), 'Kessler rescue/Atlas/Overtime/Archon/betrayal order is broken');
assert(/unlock:web/.test(DATA.scenes.act3_nifl_web.nextAction) && battles.indexOf('dross_nifl') < battles.indexOf('kessler_rescue_swarm'), 'Web/Nifl progression is not pre-Kessler');
for (const base of ['act1_battle1','dross_spall','dross_chime_base','dross_slag']) assert(battles.indexOf(base) < battles.indexOf('dross_nifl'), `Base Dross ${base} appears after first Molt`);
assert(/March 17/.test(DATA.scenes.act4_s1.text), 'TOMRA job does not begin in mid-March');
for (const key of ['act4_kessler_april9','act4_kessler_april18','act4_kessler_may6']) assert(DATA.scenes[key], `Kessler relationship bridge missing: ${key}`);
for (const encounter of battles) {
    const cfg = DATA.battleDialogue[encounter];
    assert(cfg && cfg.enemy && cfg.enemy.length && cfg.sosa && cfg.sosa.length && cfg.victory, `Incomplete battle dialogue: ${encounter}`);
}

// Story co-regulation vents Debt without acting as mana or a universal battle heal.
GAME.initGame();
GAME.player.debt = 50;
GAME.executeSingleAction('ventDebt:15');
assert(GAME.player.debt === 35 && GAME.worldFlags.totalDebtVented === 15, 'Story-authored Debt vent failed');

// The Condemned Witness's core must reject spectatorship; an active answer changes the record.
GAME.initGame();
GAME.player.unlocked.stin = true;
GAME.startBattle('archon_fight');
const redTag = GAME.enemies.find(e => e.isAnchor);
assert(redTag, 'Red-Tag Core did not spawn');
const gatedHp = redTag.hp;
assert(GAME.damageEnemy(redTag, 20, true) === 0 && redTag.hp === gatedHp, 'Red-Tag Core broke before a witness answered');
GAME.player.debt = 70;
GAME.resolveEmergencyCall();
assert(GAME.supportState.answered && GAME.player.debt === 35, 'Goth Baddie answer did not vent Archon Debt');
assert(GAME.worldFlags.archonAnswerSpeaker === 'Goth Baddie', 'Goth Baddie was not recorded as the Archon responder');
assert(GAME.log.some(line => /Goth Baddie.*choose you/.test(line)), 'Goth Baddie voice-specific Archon answer missing');
assert(GAME.damageEnemy(redTag, 20, true) > 0 && redTag.hp < gatedHp, 'Answered witness did not expose Red-Tag Core');

// Kessler uses Formalcraft Grid Integrity, never an Archon-style selectable anchor.
GAME.initGame();
GAME.player.unlocked.cleave = true;
GAME.startBattle('censor_enc');
assert(!GAME.enemies.some(e => e.isAnchor), 'Kessler incorrectly spawned an ontological anchor');
assert(GAME.bossState && GAME.bossState.type === 'censor' && GAME.bossState.fieldIntegrity === 3, 'Kessler Formalcraft Grid Integrity missing');

// Verify a successful 8-damage Black Flash becomes floor(8^2.5) = 181 on the same deferred attack.
let timers = [];
global.setTimeout = (fn, ms) => { timers.push({ fn, ms }); return timers.length; };
Math.random = () => 0;
GAME.initGame();
GAME.player.unlocked.trace = true;
GAME.player.unlocked.dismantle = true;
GAME.player.unlocked.dismantleNamed = true;
GAME.player.unlocked.blackFlash = true;
assert(GAME.getBlackFlashChance()===0 && !GAME.hasBlackFlashAwakened(), 'Black Flash became usable before the forced story awakening flag');
GAME.worldFlags.blackFlashAwakened = true;
GAME.startBattle('act2_battle1');
timers.shift().fn();
GAME.battleCutIn = null;
timers = [];
const target = GAME.selectedEnemy;
target.hp = target.maxHp = 10000;
assert(Math.round(GAME.getBlackFlashChance()*100) === 4, 'Black Flash baseline chance is not 4%');
GAME.playerDismantle();
assert(!GAME.blackFlashWindowActive, 'Initiating tap armed Black Flash synchronously');
timers.shift().fn();
assert(GAME.blackFlashWindowActive && GAME.blackFlashWindowDuration===2800, 'Black Flash window did not arm at the longer stable duration');
GAME.triggerBlackFlash();
assert(!GAME.shatteringPrompt, 'Generic red Shattering prompt leaked into Black Flash resolution');
assert(10000 - target.hp === 181, `Black Flash damage mismatch: ${10000 - target.hp}`);
assert(GAME.blackFlashZoneTurns === 3 && GAME.blackFlashStreak === 1, 'Black Flash did not enter the three-round Zone');
assert(Math.round(GAME.getBlackFlashChance()*100) === 24, 'First consecutive Zone chance is not 24%');
GAME.veilHudLevel = 2;
assert(/IN THE ZONE · 120% · STREAK 1 · NEXT 24%/.test(renderParty()), 'In the Zone HUD readout missing');
timers = [];
assert(GAME.queueBlackFlashWindow('dismantle') === true, 'Consecutive Black Flash window failed to roll in deterministic test');
const beforeConsecutive = target.hp;
timers.shift().fn(); GAME.triggerBlackFlash();
assert(beforeConsecutive - target.hp === 316, `Zone/Trace-Depth consecutive Black Flash damage mismatch: ${beforeConsecutive-target.hp}`);
assert(GAME.blackFlashStreak === 2 && Math.round(GAME.getBlackFlashChance()*100) === 38, 'Second consecutive Black Flash did not raise chance to 38%');
assert(GAME.worldFlags.passiveBlackFlashes === 2, 'Consecutive passive Black Flashes were not recorded');
Math.random = () => 0.99;
assert(GAME.queueBlackFlashWindow('dismantle') === false && GAME.blackFlashStreak === 0 && Math.round(GAME.getBlackFlashChance()*100) === 10, 'Normal Sever did not break streak while preserving Zone chance');
Math.random = () => 0;

// First Resonance is mandatory in the first deliberate hunt and unlocks future passive windows.
timers = [];
GAME.initGame();
GAME.player.unlocked.trace = true;
GAME.player.unlocked.dismantle = true;
GAME.player.unlocked.dismantleNamed = true;
GAME.startBattle('act3_hunt_battle');
timers.shift().fn();
GAME.battleCutIn = null;
GAME.turnLock = false;
timers = [];
GAME.selectedEnemy.hp = GAME.selectedEnemy.maxHp = 10000;
GAME.playerDismantle();
timers.shift().fn();
assert(GAME.blackFlashWindowActive && GAME.blackFlashTutorialWindow, 'Mandatory First Resonance did not arm');
assert(timers.length === 0, 'Mandatory First Resonance incorrectly received an expiry timer');
GAME.triggerBlackFlash();
assert(GAME.player.unlocked.blackFlash && GAME.worldFlags.blackFlashAwakened, 'First Resonance did not unlock passive Black Flash');
assert(GAME.worldFlags.blackFlashNamedBySosa && GAME.log.some(line => /SOSA NAMES IT/.test(line)), 'Black Flash was not consciously claimed/named by Sosa');
assert(GAME.enemies.length===4&&GAME.blackFlashCascadeCharges===2&&GAME.worldFlags.firstResonanceHits===1,'First Resonance did not call reinforcements/start LCK EX Cascade');
Math.random=()=>0.99;timers=[];GAME.battleCutIn=null;GAME.turnLock=false;GAME.playerDismantle();
assert(GAME.blackFlashCascadeCharges===1&&timers.length>0,'Cascade follow-up window was not guaranteed independently of normal chance');
timers.shift().fn();assert(GAME.blackFlashWindowActive,'Cascade timing window did not arm');GAME.resolvePendingBlackFlash(false);Math.random=()=>0;
assert(/Three black impacts|It happens twice|first black impact/.test(DATA.scenes.act3_resonance_aftermath.dynamicText(GAME)),'First Resonance aftermath lacks chain-aware narrative');

// Chapter 6's first conflict must preserve evidence, boundaries, and the failed pre-unlock judgment beat.
assert(DATA.scenes.act6_teaser_end.nextAction.includes('act6_claim_notice'), 'Chapter 6 still ends at its opening teaser');
assert(/cat sticker/.test(DATA.scenes.act6_portal_mirror.text) && /Kessler's daughter/.test(DATA.scenes.act6_cat_sticker.text), 'Mirrored Omnis/cat-sticker payoff missing');
assert(/Dismantle would cut both/.test(DATA.scenes.act6_two_seams.text) && /ATTEMPT 1 — ABORTED/.test(DATA.scenes.act6_abort_cut.title), 'Failed judgment-based Sever progression missing');
assert(/I do not do it/.test(DATA.scenes.act6_utica_boundary.text), 'Utica Girl boundary is not actively respected');
assert(DATA.scenes.act6_gz_route.messages.some(m=>/not asking for money or a mission/.test(m.text)), 'Top Ranked Gz ask-not-summon beat missing');
assert(/reopen review/.test(DATA.scenes.act6_clerk_first.text) && /That is not Sever: True/.test(DATA.scenes.act6_first_conflict_end.text), 'Chapter 6 evidence conflict lacks a complete result');
assert(GAME.player.unlocked.severTrue === false, 'Chapter 6 failed attempt prematurely unlocked Sever: True');

console.log(JSON.stringify({ scenes: visited.size, encounters: Object.keys(DATA.encounters).length, mainPathBattles: battles.length, battleDialogue: battles.length, blackFlash: 'pass', chapter6Conflict: 'pass' }, null, 2));
