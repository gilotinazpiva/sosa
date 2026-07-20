/* Dependency-free VN/Discord language guardrails. Run: node tests/prose-audit.js */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
global.window = global;
for (const file of ['core','act1','act2','act3','act4','act5','act6','battle-dialogue']) {
    vm.runInThisContext(fs.readFileSync(path.join(root, 'js/data', file + '.js'), 'utf8'), { filename: file });
}
function assert(value, message) { if (!value) throw new Error(message); }
const typoPattern = /\b(spiralng|alot|definately|seperate|occured|recieve|wierd|untill|becuase)\b/i;
const missingArticle = /\b(in|into|inside|on|onto|under|behind|outside|through|from|toward|at|back to) (couch|kitchen|bathroom|bedroom|living room|apartment|building|stairwell|door|table|car)\b/i;
let vn = 0, messages = 0, battleLines = 0;
for (const [key, scene] of Object.entries(DATA.scenes)) {
    const text = String(scene.text || '');
    if (text) {
        vn++;
        assert(!typoPattern.test(text), `Known typo in VN scene ${key}`);
        assert(!/\b([A-Za-z]{2,})\s+\1\b/i.test(text), `Doubled word in VN scene ${key}`);
        assert(!/\s+[,.!?]/.test(text), `Whitespace before punctuation in VN scene ${key}`);
        assert((text.match(/“/g) || []).length === (text.match(/”/g) || []).length, `Unbalanced curly quotation marks in ${key}`);
        assert(!/\b(that|and|but|because|with|to|of|the|a|an|or|then|while|where|when)$|[,;:]$/.test(text.trim()), `Dangling screen ending in ${key}`);
        const articleMatch = text.match(missingArticle);
        assert(!articleMatch, `Possible missing article in VN scene ${key}: ${articleMatch ? articleMatch[0] : ''}`);
        for (const match of text.matchAll(/\b(a|an)\s+([A-Za-z][\w'-]*)/gi)) {
            const article = match[1].toLowerCase();
            const word = match[2].toLowerCase();
            const vowelSound = /^[aeiou]/.test(word) && !/^(one|unit|uniform|unicorn|university|use|user|euro)/.test(word);
            const silentH = /^(honest|hour|heir)/.test(word);
            assert(!(article === 'a' && (vowelSound || silentH)), `a/an mismatch in ${key}: ${match[0]}`);
            assert(!(article === 'an' && !vowelSound && !silentH), `a/an mismatch in ${key}: ${match[0]}`);
        }
    }
    for (const [index, message] of (scene.messages || []).entries()) {
        const body = String(message.text || message.preview || '');
        messages++;
        assert(body.trim(), `Empty Discord message: ${key}[${index}]`);
        assert(!typoPattern.test(body), `Known typo in Discord: ${key}[${index}]`);
        assert(!/\s+[,.!?]/.test(body), `Whitespace before punctuation in Discord: ${key}[${index}]`);
        assert(!/\b([A-Za-z]{3,})\s+\1\b/i.test(body), `Doubled Discord word: ${key}[${index}]`);
    }
}
for (const [encounter, cfg] of Object.entries(DATA.battleDialogue || {})) {
    const lines = [];
    for (const entry of (cfg.enemy || [])) lines.push(typeof entry === 'string' ? entry : entry.text || '');
    for (const entry of (cfg.sosa || [])) lines.push(typeof entry === 'string' ? entry : entry.text || '');
    if (cfg.victory) lines.push(cfg.victory.badge || '', cfg.victory.title || '', cfg.victory.quote || '');
    const banter = DATA.victoryBanter && DATA.victoryBanter[encounter];
    if (banter) lines.push(...(banter.sosa || []), ...(banter.somnus || []));
    const reward = DATA.battleRewards && DATA.battleRewards[encounter];
    if (reward) lines.push(reward.found || '', reward.lesson || '');
    for (const line of lines.filter(Boolean)) {
        battleLines++;
        assert(!typoPattern.test(line), `Known typo in battle dialogue: ${encounter}`);
        assert(!/\s+[,.!?]/.test(line), `Whitespace before punctuation in battle dialogue: ${encounter}`);
        assert(!/\b([A-Za-z]{3,})\s+\1\b/i.test(line), `Doubled battle word: ${encounter}`);
    }
}
const visibleScenes=Object.values(DATA.scenes).map(scene=>({title:scene.title||'',text:scene.text||'',messages:(scene.messages||[]).map(m=>m.text||m.preview||'')}));
const displayCorpus=JSON.stringify({scenes:visibleScenes,battleDialogue:DATA.battleDialogue,victoryBanter:DATA.victoryBanter,battleRewards:DATA.battleRewards,skills:DATA.skills});
const lexicalCounts={
    hum:(displayCorpus.match(/\bhum(?:s|med|ming)?\b/gi)||[]).length,
    noStrings:(displayCorpus.match(/\bno strings(?: attached)?\b/gi)||[]).length,
    seam:(displayCorpus.match(/\bseams?\b/gi)||[]).length,
    static:(displayCorpus.match(/\bstatic\b/gi)||[]).length,
    holdTheLine:(displayCorpus.match(/\bhold the line\b/gi)||[]).length,
    geometry:(displayCorpus.match(/\bgeometr(?:y|ic|ies)\b/gi)||[]).length,
    chuuni:(displayCorpus.match(/\bchuuni\w*\b/gi)||[]).length
};
assert(lexicalCounts.hum<=3,`Hum-family overuse returned: ${lexicalCounts.hum}`);
assert(lexicalCounts.noStrings<=1,`No Strings overuse returned: ${lexicalCounts.noStrings}`);
assert(lexicalCounts.seam<=8,`Seam overuse returned: ${lexicalCounts.seam}`);
assert(lexicalCounts.static<=1,`Static overuse returned: ${lexicalCounts.static}`);
assert(lexicalCounts.holdTheLine===0,`Hold-the-line stock phrase returned: ${lexicalCounts.holdTheLine}`);
assert(lexicalCounts.geometry===0,`Geometry overuse returned: ${lexicalCounts.geometry}`);
assert(lexicalCounts.chuuni===0,`Retired chuuni phrasing returned: ${lexicalCounts.chuuni}`);
console.log(JSON.stringify({ vnScreens: vn, discordEntries: messages, battleLines, lexicalCounts, knownTypos: 'pass', articleHeuristics: 'pass', duplicateWords: 'pass' }, null, 2));
