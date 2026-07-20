/* Whole-project pre-release integrity audit. Run: node tests/project-audit.js */
const fs=require('fs'),path=require('path'),crypto=require('crypto'),vm=require('vm');
const root=path.resolve(__dirname,'..');
function assert(v,m){if(!v)throw new Error(m)}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const p=path.join(dir,e.name);return e.isDirectory()?walk(p):[p]})}
function rel(p){return path.relative(root,p).replace(/\\/g,'/')}
function sha(p){return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')}

// Workspace contract: exact canonical doc count, no symlinks, no accidental archives or generated debris.
const files=walk(root).sort();
assert(files.every(p=>!fs.lstatSync(p).isSymbolicLink()),'Workspace contains a symbolic link');
assert(fs.readdirSync(path.join(root,'docs')).filter(x=>x.endsWith('.md')).sort().join('|')==='MASTER_GDD_HANDOFF.md|SOSA_DEFINITIVE_DOSSIER.md|WORLD_TAXONOMY_ECOLOGY.md','Canonical lore/design document set changed');
assert(!files.some(p=>/\.(zip|bak|tmp|orig|rej)$/i.test(p)),'Workspace contains an archive or edit-debris file');
assert(!files.some(p=>/(^|\/)(node_modules|dist|build|coverage|__pycache__)(\/|$)/.test(rel(p))),'Workspace contains generated dependency/build debris');

// Every JavaScript file must parse independently.
const jsFiles=files.filter(p=>p.endsWith('.js'));
for(const p of jsFiles)new vm.Script(fs.readFileSync(p,'utf8'),{filename:rel(p)});
for(const p of files.filter(p=>p.endsWith('.json')))JSON.parse(fs.readFileSync(p,'utf8'));

// Project manifest is a verifiable inventory, excluding the immutable baseline and itself.
const manifest=JSON.parse(fs.readFileSync(path.join(root,'project-manifest.json'),'utf8'));
const inventoryFiles=files.map(rel).filter(x=>x!=='project-manifest.json'&&x!=='baseline-manifest.json');
const recorded=(manifest.files||[]).map(x=>x.path).sort();
assert(recorded.join('|')===inventoryFiles.join('|'),'project-manifest file inventory is missing or carrying files');
for(const item of manifest.files){
 const p=path.join(root,item.path),stat=fs.statSync(p);
 assert(stat.size===item.bytes,`Manifest byte count stale: ${item.path}`);
 assert(sha(p)===item.sha256,`Manifest hash stale: ${item.path}`);
}

// Load canonical data and runtime methods without browser dependencies.
global.window=global;window.matchMedia=()=>({matches:false});
global.localStorage={getItem(){return null},setItem(){},removeItem(){}};
global.document={getElementById(){return null},querySelector(){return null},querySelectorAll(){return[]},createElement(){return{style:{setProperty(){}},classList:{add(){},remove(){}},appendChild(){},removeChild(){}}},body:{appendChild(){}},head:{appendChild(){}}};
global.setTimeout=()=>1;global.clearTimeout=()=>{};global.setInterval=()=>1;global.clearInterval=()=>{};global.render=()=>{};
const runtime=['js/data/core.js','js/data/act1.js','js/data/act2.js','js/data/act3.js','js/data/act4.js','js/data/act5.js','js/data/act6.js','js/data/battle-dialogue.js','js/game-core.js','js/game-battle.js','js/game-enemies.js','js/game-bosses.js','js/game-states.js'];
for(const f of runtime)vm.runInThisContext(fs.readFileSync(path.join(root,f),'utf8'),{filename:f});
global.AUDIO=new Proxy({},{get:()=>()=>{}});global.FX=new Proxy({},{get:()=>()=>{}});

const modes=new Set(['vn','phone','dm-list','cg','voice']);
const bgKeys=new Set(['library_corner','ditch_predawn','utica_alley','laundromat_dawn','dart_station','dropin_center','tomra','css_bg_void','css_bg_formal']);
const cgJpg=new Set(['cg_mask_laundromat','cg_somnus_manifestation','cg_coffin_pilot','cg_reality_marble']);
let vnScreens=0,phoneMessages=0;
for(const [key,scene] of Object.entries(DATA.scenes)){
 assert(scene.key===key,`Scene property/key mismatch: ${key} / ${scene.key}`);
 assert(modes.has(scene.mode),`Unknown scene mode ${scene.mode} at ${key}`);
 assert(typeof scene.nextAction==='string'&&scene.nextAction,`Missing nextAction at ${key}`);
 if(scene.mode==='vn'){
  vnScreens++;assert(typeof scene.text==='string'&&scene.text.trim(),`Empty VN text at ${key}`);
  assert([...scene.text].length<=340,`VN screen exceeds 340 characters: ${key}`);
 }
 if(scene.bg!==undefined)assert(bgKeys.has(scene.bg),`Unknown background key ${scene.bg} at ${key}`);
 if(scene.cg){
  const ext=cgJpg.has(scene.cg)?'.jpg':'.png';
  assert(fs.existsSync(path.join(root,'assets',scene.cg+ext)),`Missing CG ${scene.cg}${ext} at ${key}`);
 }
 for(const msg of scene.messages||[]){
  phoneMessages++;
  if(scene.mode==='dm-list'){
   assert(typeof msg.handle==='string'&&typeof msg.preview==='string',`Malformed DM preview at ${key}`);
   assert(DATA.roster[msg.handle],`Unknown DM handle ${msg.handle} at ${key}`);
  } else {
   assert(typeof msg.text==='string'&&msg.text.trim(),`Empty phone message at ${key}`);
   assert(msg.self===true||typeof msg.user==='string',`Phone message has no sender at ${key}`);
   if(!msg.self&&msg.user)assert(DATA.roster[msg.user]||msg.user==='system',`Unknown phone sender ${msg.user} at ${key}`);
  }
 }
 for(const m of scene.nextAction.matchAll(/gotoScene\(["']([^"']+)/g))assert(DATA.scenes[m[1]],`Missing route target ${m[1]} from ${key}`);
 for(const m of scene.nextAction.matchAll(/startBattle\(["']([^"']+)/g))assert(DATA.encounters[m[1]],`Missing encounter ${m[1]} from ${key}`);
}

// Encounter/enemy schemas and effect registry must agree.
const referencedEffects=new Set();
const enemyCatalog=Object.assign({},DATA.weakEnemies||{},DATA.enemies||{},DATA.humans||{});
for(const [enc,enemyKeys] of Object.entries(DATA.encounters)){
 assert(Array.isArray(enemyKeys)&&enemyKeys.length,`Empty encounter ${enc}`);
 for(const rawKey of enemyKeys){const key=rawKey.startsWith('h:')?rawKey.slice(2):rawKey;assert(enemyCatalog[key],`Encounter ${enc} references missing enemy ${rawKey}`);}
}
for(const [key,enemy] of Object.entries(enemyCatalog)){
 assert(enemy.hp>0&&enemy.atk>=0,`Invalid core stats for ${key}`);
 const pools=['moves','phase1Moves','phase2Moves'].flatMap(k=>enemy[k]||[]);
 for(const move of pools){
  assert(move.id&&move.label,`Unnamed move on ${key}`);
  assert(['single','barrage','area','field'].includes(move.type),`Unknown move type ${move.type} on ${key}`);
  assert(move.damage>=0&&(move.hits||1)>=1&&(move.guardImpact===undefined||move.guardImpact>=0),`Invalid move numbers on ${key}/${move.id}`);
  if(move.effect&&move.effect!=='none')referencedEffects.add(move.effect);
 }
}
assert([...referencedEffects].every(x=>typeof GAME.enemyMoveEffectHandlers[x]==='function'),'Encounter move references an unregistered effect handler');
assert(manifest.build.routedScenes===Object.keys(DATA.scenes).length,'Manifest routed-scene count is stale');
assert(manifest.build.encounterDefinitions===Object.keys(DATA.encounters).length,'Manifest encounter count is stale');

// Runtime entry points remain offline, load Chapter 6, and avoid duplicate eager audit frames.
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(index.includes('js/data/act6.js'),'index.html does not load Chapter 6');
assert(!/<(?:script|link|img|iframe)\b[^>]*(?:src|href)=["']https?:/i.test(index),'index.html has an external runtime dependency');
assert(!index.includes('id="audit-iframe"'),'index.html eagerly embeds the runtime-only Omnis iframe');
const renderSource=fs.readFileSync(path.join(root,'js/render.js'),'utf8');
assert(/id="audit-iframe"[^>]*title="Omnis subject scan for Sosa"/.test(renderSource),'Runtime Omnis iframe lacks a title');
assert(renderSource.includes("scene.bg === 'css_bg_formal') return 'void-formal'"),'Formalcraft CSS background key is not mapped');
assert(/phone-advance-screen[^\n]+tabindex=/.test(renderSource),'Phone advance surface lacks keyboard focus');
for(const sourceFile of [...jsFiles.map(rel),'index.html','cg_stats_scan.html']){
 const text=fs.readFileSync(path.join(root,sourceFile),'utf8');
 for(const m of text.matchAll(/assets\/[A-Za-z0-9_.-]+\.(?:png|jpe?g)/gi))assert(fs.existsSync(path.join(root,m[0])),`${sourceFile} references missing literal asset ${m[0]}`);
}

// Battle-facing sources cannot contain pictorial emoji or retired font-eye glyphs.
const battleSources=['js/render.js','js/game-battle.js','js/game-enemies.js','js/game-states.js','js/data/battle-dialogue.js','css/battle.css'].map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n');
assert(!/[\u{1F000}-\u{1FAFF}]/u.test(battleSources),'Battle-facing source contains emoji');
assert(!/[👁👀🧿◉◎]/u.test(battleSources),'Battle-facing source contains a prohibited eye glyph');

// Asset signatures catch corruption without image-library dependencies.
const assetFiles=files.filter(p=>rel(p).startsWith('assets/'));
const binaryAssets=assetFiles.filter(p=>/\.(?:png|jpe?g|woff2)$/i.test(p));
for(const p of binaryAssets){
 const b=fs.readFileSync(p),ext=path.extname(p).toLowerCase();
 assert(b.length>1024,`Suspiciously small binary asset ${rel(p)}`);
 if(ext==='.png')assert(b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])),`Corrupt PNG signature ${rel(p)}`);
 if(ext==='.jpg'||ext==='.jpeg')assert(b[0]===0xff&&b[1]===0xd8&&b[b.length-2]===0xff&&b[b.length-1]===0xd9,`Corrupt JPEG signature ${rel(p)}`);
 if(ext==='.woff2')assert(b.subarray(0,4).toString('ascii')==='wOF2',`Corrupt WOFF2 signature ${rel(p)}`);
}

console.log(JSON.stringify({workspaceFiles:files.length,manifestFiles:manifest.files.length,javascriptFiles:jsFiles.length,scenes:Object.keys(DATA.scenes).length,vnScreens,phoneMessages,encounters:Object.keys(DATA.encounters).length,enemies:Object.keys(enemyCatalog).length,registeredEffects:referencedEffects.size,assets:assetFiles.length,webfonts:binaryAssets.filter(p=>p.endsWith('.woff2')).length,inventory:'pass',schemas:'pass',routes:'pass',offlineRuntime:'pass',battleEmojiPolicy:'pass',assetSignatures:'pass'},null,2));
