import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
async function walk(path) { const a=[]; for (const e of await readdir(path,{withFileTypes:true})) { const p=join(path,e.name); a.push(...(e.isDirectory()?await walk(p):[p])); } return a; }
const files=await walk('public');
const pdfs=files.filter(f=>f.endsWith('.pdf'));
assert.equal(pdfs.length,1,'Only the free sample PDF may be public');
assert.ok(pdfs[0].endsWith('the-ai-unicorn-protocol-preview.pdf'));
assert.ok(!files.some(f=>/Production_Final|complete-book|paid-book/i.test(f)));
for(let n=1;n<=5;n++) assert.ok(files.includes(`public/preview/page-${n}.webp`));
const audit=JSON.parse(await readFile('asset-verification.json','utf8'));
assert.equal(audit.bookPages,179); assert.equal(audit.previewPages,5); assert.equal(audit.fullBookInProject,false);
const sampleHash=createHash('sha256').update(await readFile(pdfs[0])).digest('hex');
assert.equal(sampleHash,audit.sourcePreviewSha256,'The public PDF must remain the supplied five-page sample');
console.log('Passed: actual 5-page preview, required imagery, and no public paid PDF.');
