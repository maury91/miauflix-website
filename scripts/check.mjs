import { readFile, access, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const entries = await readdir(root);
const pages = new Map(
  await Promise.all(
    entries
      .filter((file) => file.endsWith('.html'))
      .map(async (file) => [file, await readFile(resolve(root, file), 'utf8')]),
  ),
);
const idsFor = (html) => [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
for (const [file, html] of pages) {
  assert(!/\{\{.*?\}\}/.test(html), `${file}: unresolved template token`);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${file}: one primary heading`);
  const ids = idsFor(html);
  assert.equal(ids.length, new Set(ids).size, `${file}: duplicate HTML IDs`);
  for (const [, attribute, value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (/^https?:/.test(value)) {
      assert(value.startsWith('https:'), `External ${attribute} should use HTTPS`);
      continue;
    }
    const [path, fragment] = value.split('#');
    const target = path || file;
    await access(resolve(root, target));
    if (fragment)
      assert(
        pages.has(target) && idsFor(pages.get(target)).includes(fragment),
        `${file}: missing target ${value}`,
      );
  }
  for (const [, attributes] of html.matchAll(/<img\b([^>]+)>/g)) {
    assert(/\balt="[^"]+"/.test(attributes), `${file}: image needs useful alt text`);
    assert(
      /\bwidth="\d+"/.test(attributes) && /\bheight="\d+"/.test(attributes),
      `${file}: image needs dimensions`,
    );
  }
}
for (const entry of entries.filter((file) => file.endsWith('.css'))) {
  const css = await readFile(resolve(root, entry), 'utf8');
  for (const [, value] of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) {
    if (!/^(data:|https?:)/.test(value))
      await access(resolve(dirname(resolve(root, entry)), value));
  }
}
console.log(
  `Static checks passed for ${pages.size} pages: templates, headings, IDs, cross-page links, asset references, image accessibility.`,
);
