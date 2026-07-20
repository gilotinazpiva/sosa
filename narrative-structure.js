/* Act-by-act temporal/speaker/aesthetic structure audit. Run: node tests/narrative-structure.js */
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');global.window=global;
for(const file of ['core','act1','act2','act3','act4','act5','act6','battle-dialogue'])vm.runInThisContext(fs.readFileSync(path.join(root,'js/data',file+'.js'),'utf8'),{filename:file});
function assert(v,m){if(!v)throw new Error(m)}
function speakers(keys){return keys.map(k=>{assert(DATA.scenes[k],`Missing split scene ${k}`);return DATA.scenes[k].speaker}).join('|')}
const contracts={
 act2Arrival:[['act2_bus_meet','act2_bus_meet_utica','act2_bus_meet_sosa','act2_bus_meet_utica2'],'Narrator|Utica Girl|Sosa|Utica Girl'],
 act2GothCall:[['act2_goth_reconnect_call','act2_goth_reconnect_command','act2_goth_reconnect_heat','act2_goth_reconnect_name','act2_goth_reconnect_answer'],'Sosa|Goth Baddie|Sosa|Goth Baddie|Sosa'],
 act2Boundary:[['act2_utica_future_boundary','act2_utica_future_boundary_sosa','act2_utica_future_boundary_utica'],'Utica Girl|Sosa|Utica Girl'],
 act3Orientation:[['act3_utica_orientation_return','act3_orientation_utica1','act3_orientation_sosa1','act3_orientation_utica2'],'Narrator|Utica Girl|Sosa|Utica Girl'],
 act3Morning:[['act3_hunt_quiet_morning','act3_hunt_morning_utica1','act3_hunt_morning_sosa1','act3_hunt_morning_utica2','act3_hunt_morning_sosa2','act3_hunt_morning_after'],'Narrator|Utica Girl|Sosa|Utica Girl|Sosa|Narrator'],
 act4Banter:[['act4_minor_banter','act4_minor_banter_k1','act4_minor_banter_s2','act4_minor_banter_k2','act4_minor_banter_narration'],'Sosa|Elias Kessler|Sosa|Elias Kessler|Narrator'],
 act4Food:[['act4_kessler_food','act4_food_kessler1','act4_food_sosa','act4_food_kessler2','act4_food_narration'],'Narrator|Elias Kessler|Sosa|Elias Kessler|Narrator'],
 act4TypeZero:[['act4_kessler_type_zero','act4_type_zero_system','act4_type_zero_kessler','act4_type_zero_sosa'],'Sosa|System|Elias Kessler|Sosa'],
 act6Clerk:[['act6_clerk','act6_clerk_first','act6_clerk_sosa1','act6_clerk_second','act6_clerk_sosa2','act6_clerk_stamp'],'Narrator|Municipal Clerk|Sosa|Municipal Clerk|Sosa|Narrator'],
 act6Goth:[['act6_goth_truth','act6_goth_truth_line','act6_goth_truth_sosa','act6_goth_answer','act6_goth_answer_first','act6_goth_answer_sosa','act6_goth_answer_final'],'Narrator|Goth Baddie|Sosa|Narrator|Goth Baddie|Sosa|Goth Baddie']
};
for(const [name,[keys,expected]] of Object.entries(contracts))assert(speakers(keys)===expected,`Speaker ownership contract failed: ${name}`);
assert(DATA.scenes.act1_s4_somnus_text__tap2.retrospective&&DATA.scenes.act2_s4c__p5.retrospective,'Known retrospective Sosa cards lost metadata');
assert(!/special earbuds yet/.test(DATA.scenes.act2_alone_cold.text),'Accidental future knowledge remains in immediate threat scene');
for(const scene of Object.values(DATA.scenes))if(/The earbuds will .* later|Later I('|’)ll learn/i.test(scene.text||''))assert(scene.retrospective===true,`Unmarked future-aware scene: ${scene.key}`);
assert((DATA.scenes.act1_s4_somnus_text.text||'').length<240&&(DATA.scenes.act1_s4_somnus_visual.text||'').length<240,'Manifestation CG cards exceed phone pacing budget');
const renderSource=fs.readFileSync(path.join(root,'js/render.js'),'utf8');
assert(/“\[\^”\]\*”\|"\[\^"\]\*"/.test(renderSource),'Straight and curly quoted speech are not both parsed as speech');
const early=Object.entries(DATA.scenes).filter(([k])=>/^act[1-3]_/.test(k)&&!/^act3_s[4-7]/.test(k)).map(([,s])=>[s.title,s.text].join(' ')).join('\n');
assert(!/\b(Dross|Pall|Knell|Spall|Slag|Archon|Formalcraft|Omnis|Egregore|Censor|cleanup)\b/.test(early),'Formal vocabulary leaked into early route');
console.log(JSON.stringify({contracts:Object.keys(contracts).length,retrospective:'pass',quoteChannels:'pass',cgPacing:'pass',formalOrder:'pass'},null,2));
