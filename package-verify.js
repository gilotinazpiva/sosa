/* Canonical source-complete itch ZIP validation. Run: node tests/package-verify.js [zip] */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const crypto = require('crypto');
const root = path.resolve(__dirname, '..');
const zip = path.resolve(process.argv[2] || '/home/user/sosa_game.zip');
function assert(value, message) { if (!value) throw new Error(message); }
function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes:true }).flatMap(entry => {
        const p = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(p) : [p];
    });
}
function relative(p) { return path.relative(root, p).replace(/\\/g, '/'); }
function hash(data) { return crypto.createHash('sha256').update(data).digest('hex'); }

assert(fs.existsSync(zip), `ZIP not found: ${zip}`);
const rawEntries = execFileSync('unzip', ['-Z1', zip], { encoding:'utf8' }).trim().split(/\r?\n/).filter(Boolean);
const fileEntries = rawEntries.filter(entry => !entry.endsWith('/'));
assert(fileEntries.includes('index.html'), 'index.html is not at archive root');
assert(new Set(rawEntries).size === rawEntries.length, 'ZIP contains duplicate archive entries');
assert(!rawEntries.some(entry => /^game\//.test(entry) || /^sosa[^/]*\//i.test(entry)), 'ZIP contains an extra top-level project folder');
assert(!rawEntries.some(entry => entry.startsWith('/') || entry.includes('..') || entry.includes('\\')), 'ZIP contains unsafe paths');

// The single archive carries the entire canonical project tree, including docs/tests,
// while remaining itch-safe because index.html stays at archive root.
const expected = walk(root).map(relative).sort();
const actual = [...fileEntries].sort();
const missing = expected.filter(entry => !actual.includes(entry));
const extra = actual.filter(entry => !expected.includes(entry));
assert(!missing.length, `Project entries missing from ZIP: ${missing.join(', ')}`);
assert(!extra.length, `Unexpected entries in ZIP: ${extra.join(', ')}`);
assert(actual.every(entry => fs.statSync(path.join(root, entry)).size > 0), 'Canonical project contains an empty file');
const stale = actual.filter(entry => hash(execFileSync('unzip', ['-p', zip, entry], { maxBuffer:16 * 1024 * 1024 })) !== hash(fs.readFileSync(path.join(root, entry))));
assert(!stale.length, `ZIP content is stale for: ${stale.join(', ')}`);

for (const required of [
    'index.html', 'cg_stats_scan.html', 'README.md', 'project-manifest.json',
    'docs/MASTER_GDD_HANDOFF.md', 'docs/SOSA_DEFINITIVE_DOSSIER.md',
    'docs/WORLD_TAXONOMY_ECOLOGY.md', 'tests/smoke.js', 'js/data/act6.js'
]) assert(actual.includes(required), `Required project file missing: ${required}`);

execFileSync('unzip', ['-t', zip], { stdio:'ignore' });
console.log(JSON.stringify({
    zip,
    entries:rawEntries.length,
    projectFiles:fileEntries.length,
    exactProjectSet:'pass',
    contentMatchesSource:'pass',
    rootIndex:'pass',
    sourceComplete:'pass',
    itchSafePaths:'pass',
    integrity:'pass'
}, null, 2));
