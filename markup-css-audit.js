/* Dependency-free HTML/CSS structural audit. Run: node tests/markup-css-audit.js */
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
function assert(value,message){if(!value)throw new Error(message)}
function lineAt(text,index){return text.slice(0,index).split('\n').length}
function stripBlocks(html,tag){return html.replace(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}\\s*>`,'gi'),'')}

const htmlFiles=['index.html','cg_stats_scan.html'];
const voidTags=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const optionalClose=new Set(['li','dt','dd','p','thead','tbody','tfoot','tr','th','td','option']);
let localRefs=0,ids=0,tags=0;
for(const file of htmlFiles){
  const source=fs.readFileSync(path.join(root,file),'utf8');
  assert(/^\s*<!doctype html>/i.test(source),`${file}: missing HTML5 doctype`);
  assert(/<html\b[^>]*\blang=["'][^"']+["']/i.test(source),`${file}: html lang is missing`);
  assert(/<meta\b[^>]*charset=/i.test(source),`${file}: charset meta is missing`);
  assert(/<meta\b[^>]*name=["']viewport["']/i.test(source),`${file}: viewport meta is missing`);
  assert((source.match(/<title\b/gi)||[]).length===1,`${file}: expected exactly one title`);
  const markup=stripBlocks(stripBlocks(source,'script'),'style').replace(/<!--[\s\S]*?-->/g,'');
  const seenIds=new Map();
  for(const match of markup.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)){
    const id=match[1]; ids++;
    assert(!seenIds.has(id),`${file}:${lineAt(source,match.index)} duplicate id "${id}"`);
    seenIds.set(id,match.index);
  }
  for(const match of markup.matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/gi)){
    const ref=match[1];
    if(/^(?:[a-z]+:|#|\/\/|data:)/i.test(ref))continue;
    const clean=decodeURIComponent(ref.split(/[?#]/)[0]);
    if(!clean)continue;
    localRefs++;
    assert(fs.existsSync(path.resolve(root,path.dirname(file),clean)),`${file}:${lineAt(source,match.index)} missing local reference ${ref}`);
  }
  const stack=[];
  for(const match of markup.matchAll(/<\s*(\/?)\s*([a-z][\w:-]*)\b[^>]*>/gi)){
    const closing=!!match[1],tag=match[2].toLowerCase(),token=match[0]; tags++;
    if(voidTags.has(tag)||/\/\s*>$/.test(token))continue;
    if(!closing){
      if(optionalClose.has(tag)&&stack.length&&stack[stack.length-1].tag===tag)stack.pop();
      stack.push({tag,index:match.index});
      continue;
    }
    if(optionalClose.has(tag)){
      const found=stack.map(x=>x.tag).lastIndexOf(tag);
      if(found>=0)stack.splice(found,1);
      continue;
    }
    const top=stack.pop();
    assert(top&&top.tag===tag,`${file}:${lineAt(source,match.index)} closing </${tag}> mismatches ${top?`<${top.tag}> from line ${lineAt(source,top.index)}`:'empty stack'}`);
  }
  const required=stack.filter(x=>!optionalClose.has(x.tag));
  assert(required.length===0,`${file}: unclosed <${required[0]?.tag}> from line ${required[0]?lineAt(source,required[0].index):'?'}`);
}

const cssFiles=fs.readdirSync(path.join(root,'css')).filter(x=>x.endsWith('.css')).sort();
assert(cssFiles.length>0,'No CSS files found');
let cssBytes=0,mediaQueries=0;
function auditCss(file,text){
  cssBytes+=Buffer.byteLength(text); mediaQueries+=(text.match(/@media\b/g)||[]).length;
  const stack=[]; let quote=null,comment=false,escape=false;
  const pairs={'}':'{',')':'(',']':'['};
  for(let i=0;i<text.length;i++){
    const c=text[i],n=text[i+1];
    if(comment){if(c==='*'&&n==='/'){comment=false;i++}continue}
    if(quote){if(escape){escape=false;continue}if(c==='\\'){escape=true;continue}if(c===quote)quote=null;continue}
    if(c==='/'&&n==='*'){comment=true;i++;continue}
    if(c==='"'||c==="'"){quote=c;continue}
    if(c==='{'||c==='('||c==='[')stack.push({char:c,index:i});
    else if(pairs[c]){
      const top=stack.pop();
      assert(top&&top.char===pairs[c],`${file}:${lineAt(text,i)} mismatched ${c}`);
    }
  }
  assert(!comment,`${file}: unclosed comment`); assert(!quote,`${file}: unclosed string`);
  assert(stack.length===0,`${file}: unclosed ${stack[0]?.char} from line ${stack[0]?lineAt(text,stack[0].index):'?'}`);
  assert(!/@import\b/i.test(text),`${file}: @import violates offline runtime policy`);
  assert(!/url\(\s*["']?(?:https?:)?\/\//i.test(text),`${file}: external CSS URL violates offline runtime policy`);
  for(const match of text.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)){
    const ref=match[1].trim();if(/^(?:data:|https?:|\/\/|#)/i.test(ref))continue;
    localRefs++;assert(fs.existsSync(path.resolve(root,'css',ref)),`${file}:${lineAt(text,match.index)} missing CSS asset ${ref}`);
  }
  for(const match of text.matchAll(/@media\s*([^\{]+)\{/g))assert(match[1].trim(),`${file}:${lineAt(text,match.index)} empty media query`);
}
for(const file of cssFiles)auditCss(file,fs.readFileSync(path.join(root,'css',file),'utf8'));

// Every maintained stylesheet must be loaded by the game or the standalone Omnis scan.
const combinedHtml=htmlFiles.map(x=>fs.readFileSync(path.join(root,x),'utf8')).join('\n');
for(const file of cssFiles)assert(combinedHtml.includes(`css/${file}`),`css/${file} is orphaned from both HTML entry points`);

console.log(JSON.stringify({htmlFiles:htmlFiles.length,htmlTags:tags,uniqueIds:ids,localReferences:localRefs,cssFiles:cssFiles.length,cssBytes,mediaQueries,htmlStructure:'pass',localAssets:'pass',cssDelimiters:'pass',offlineCss:'pass'},null,2));
