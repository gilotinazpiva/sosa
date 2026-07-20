/* Save migration and dynamic-state fixtures. Run: node tests/save-migration.js */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const fixtureDir = path.join(__dirname, 'fixtures');
let stored = null;

global.window = global;
global.localStorage = {
    getItem(key) { return key === 'sosa_game_save_v1' ? stored : null; },
    setItem(key, value) { if (key === 'sosa_game_save_v1') stored = value; },
    removeItem(key) { if (key === 'sosa_game_save_v1') stored = null; }
};
global.document = { getElementById() { return null; } };
global.render = () => {};
global.AUDIO = { setMuted() {}, setBgmVolume() {}, setSfxVolume() {}, resume() {} };
global.FX = {};

for (const file of ['js/data/core.js','js/data/act1.js','js/data/act2.js','js/data/act3.js','js/data/act4.js','js/data/act5.js','js/data/act6.js','js/game-core.js']) {
    vm.runInThisContext(fs.readFileSync(path.join(root, file), 'utf8'), { filename: file });
}
function assert(value, message) { if (!value) throw new Error(message); }
function loadFixture(name) {
    stored = fs.readFileSync(path.join(fixtureDir, name), 'utf8');
    GAME.initGame();
    assert(GAME.hasSave(), `${name} was not recognized`);
    assert(GAME.loadSave(), `${name} failed to load`);
    return JSON.parse(stored);
}
function roundTrip(name) {
    GAME.saveGame();
    const data = JSON.parse(stored);
    assert(data.version === 1, `${name} changed save version`);
    assert(data.currentSceneKey === GAME.currentScene.key, `${name} lost scene on round trip`);
    return data;
}

loadFixture('save-v1-legacy-fields.json');
assert(GAME.player.unlocked.patchJob === true, 'scarMend did not migrate to patchJob');
assert(GAME.player.unlocked.battleContinuation === true, 'endure did not migrate to battleContinuation');
assert(GAME.player.unlocked.blackFlash === false, 'blackFlash default was not supplied');
assert(!Object.prototype.hasOwnProperty.call(GAME.player.unlocked, 'scarMend'), 'scarMend survived migration');
assert(!Object.prototype.hasOwnProperty.call(GAME.player.unlocked, 'endure'), 'endure survived migration');
assert(GAME.somnusNamed === false && GAME.currentScene.key === 'act1_s1', 'Legacy Act 1 state did not restore');
assert(GAME.settings.audioMuted && GAME.settings.reducedMotion && !Object.prototype.hasOwnProperty.call(GAME.settings,'muted'), 'Legacy audio/accessibility settings did not migrate');
const legacyRoundTrip = roundTrip('save-v1-legacy-fields.json');
assert(legacyRoundTrip.player.unlocked.patchJob && legacyRoundTrip.player.unlocked.battleContinuation, 'Migrated fields did not persist');

loadFixture('save-v1-atlas-furnace.json');
assert(GAME.currentScene.key === 'act4_joint_after' && /Fast was not the same as safe/.test(GAME.currentScene.text), 'Atlas Furnace dynamic aftermath did not materialize');
assert(GAME.player.unlocked.web && GAME.player.unlocked.furnace, 'Mid-Act 4 unlock state did not restore');
assert(GAME.worldFlags.blackFlashAwakened===true, 'Legacy post-awakening save did not infer the Black Flash story gate');
assert(GAME.termDiscoveries['Somnus']&&GAME.termDiscoveries['Ypsilon Veil']&&GAME.termDiscoveries['Sever: Web']&&GAME.termDiscoveries['Furnace (Open)'],'Legacy save did not infer discovered glossary terms');
const atlasRoundTrip=roundTrip('save-v1-atlas-furnace.json');assert(atlasRoundTrip.termDiscoveries&&atlasRoundTrip.termDiscoveries['Ypsilon Veil'],'Glossary discoveries did not persist on save');

loadFixture('save-v1-overtime-furnace.json');
assert(GAME.currentScene.key === 'act4_overtime_after' && /sends them home without pay/.test(GAME.currentScene.text), 'Overtime Furnace dynamic aftermath did not materialize');
roundTrip('save-v1-overtime-furnace.json');

loadFixture('save-v1-pre-graveframe.json');
assert(GAME.currentScene.key === 'act5_s3_text__p2' && GAME.player.debt === 99, 'Pre-Graveframe threshold state did not restore');
assert(GAME.player.unlocked.graveframe === true && !(GAME.coffinState && GAME.coffinState.active), 'Pre-Graveframe fixture entered control transfer during load');
roundTrip('save-v1-pre-graveframe.json');

loadFixture('save-v1-chapter6-collateral.json');
assert(GAME.currentScene.key === 'act6_collateral_record', 'Chapter 6 civic scene did not restore');
assert(/One tenant needed stitches/.test(GAME.currentScene.text) && /COLLATERAL: 4/.test(GAME.currentScene.text), 'Chapter 6 dynamic civic Collateral did not materialize');
roundTrip('save-v1-chapter6-collateral.json');

loadFixture('save-v1-partial-corrupt.json');
assert(GAME.currentScene.key === 'act1_s1', 'Missing saved scene did not fall back safely');
assert(GAME.player.maxHp === 100 && GAME.player.hp === 100 && GAME.player.debt === 100, 'Malformed player numbers were not bounded/defaulted');
assert(GAME.player.unlocked.patchJob && GAME.player.unlocked.battleContinuation, 'Partial unlock data lost defaults or migration');
assert(GAME.settings.bgmVolume === 1 && GAME.settings.sfxVolume === 0.9 && GAME.settings.audioMuted, 'Malformed settings were not migrated/bounded');
assert(Object.keys(GAME.worldFlags).length === 0, 'Malformed worldFlags did not fall back to an object');
roundTrip('save-v1-partial-corrupt.json');

console.log(JSON.stringify({
    fixtures: 6,
    legacyMigration: 'pass',
    atlasDynamic: 'pass',
    overtimeDynamic: 'pass',
    preGraveframe: 'pass',
    chapter6Collateral: 'pass',
    partialCorruptionRecovery: 'pass',
    roundTrips: '6/6'
}, null, 2));
