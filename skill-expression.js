/* Dossier class/personal skill expression audit. Run: node tests/skill-expression.js */
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
global.window=global;window.matchMedia=()=>({matches:false});
global.localStorage={getItem(){return null},setItem(){},removeItem(){}};
global.document={getElementById(){return null},querySelector(){return null},querySelectorAll(){return[]},createElement(){return{style:{setProperty(){}},classList:{add(){},remove(){}},appendChild(){},removeChild(){}}},body:{appendChild(){}},head:{appendChild(){}}};
global.setTimeout=()=>1;global.clearTimeout=()=>{};global.setInterval=()=>1;global.clearInterval=()=>{};global.render=()=>{};
for(const file of ['js/data/core.js','js/data/act1.js','js/data/act2.js','js/data/act3.js','js/data/act4.js','js/data/act5.js','js/data/act6.js','js/data/battle-dialogue.js','js/game-core.js','js/game-battle.js','js/game-enemies.js','js/game-bosses.js','js/game-states.js'])vm.runInThisContext(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});
global.AUDIO=new Proxy({},{get:()=>()=>{}});global.FX=new Proxy({},{get:()=>()=>{}});
function assert(v,m){if(!v)throw new Error(m)}
const story=Object.values(DATA.scenes).map(s=>s.text||'').join('\n');
const dossier=fs.readFileSync(path.join(root,'docs/SOSA_DEFINITIVE_DOSSIER.md'),'utf8');
const battle=fs.readFileSync(path.join(root,'js/game-battle.js'),'utf8')+fs.readFileSync(path.join(root,'js/game-states.js'),'utf8');

const expression={
 territoryCreation:/metaphysical sinkhole|walking landfill for negative energy/i.test(story)&&/Sever: Web/.test(story),
 itemConstruction:/Item Construction E-/.test(story)&&/Ypsilon Veil/.test(story),
 falseMysticEyes:/structural fault|fault lines/.test(story)&&/unlock:trace/.test(fs.readFileSync(path.join(root,'js/data/act2.js'),'utf8')),
 battleContinuation:/Battle Continuation/.test(story)&&/resolveSosaAtZeroHP/.test(battle),
 validationEngine:/high-cardinality|network is much larger/i.test(story)&&/beginEmergencyCall/.test(battle),
 charisma:/women I flirt with, check on, sext, comfort/i.test(story)&&/care moving out from me is real/i.test(story),
 imperialPrivilegeFalse:/Imperial Privilege \(False\)/.test(story)&&!!DATA.skills.imperialPrivilegeFalse
};
for(const [skill,pass] of Object.entries(expression))assert(pass,`Dossier skill lacks narrative/mechanical expression: ${skill}`);
assert(DATA.skills.imperialPrivilegeFalse&&DATA.skills.imperialPrivilegeFalse.name==='Imperial Privilege (False)','Retired public skill name remains');
assert(!/Chuunibyou Privilege|chuuni brain|chuuni name/i.test(story),'Retired fandom-label language remains in narrative');
assert(DATA.scenes.act2_s4c__p5.retrospective===true,'Future-aware Sosa narration lacks retrospective channel metadata');
assert(/Living and nonliving targets both qualify/.test(dossier)&&/ordinary rectangular glasses have no supernatural suppression function/.test(dossier),'False Eyes target/suppression rule is missing');
assert(/candidate pressure can be broad; resolved lines remain narrow/.test(dossier),'False Eyes perceptual gating principle is missing');

console.log(JSON.stringify({...expression,imperialPrivilegeMechanic:'deferred for contextual redesign',retrospectiveChannel:'pass'},null,2));
