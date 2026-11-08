import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { icon } from './icons.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
export async function build() {
  const source = `${root}src/`;
  const output = `${root}dist/`;
  const pages = ['index.html', 'features.html'];
  const header = await readFile(`${source}partials/header.html`, 'utf8');
  const footer = await readFile(`${source}partials/footer.html`, 'utf8');
  const styles = await readFile(`${source}styles.css`, 'utf8');
  const script = await readFile(`${source}script.js`, 'utf8');
  const fingerprint = (content) => createHash('sha256').update(content).digest('hex').slice(0, 10);
  const cssName = `styles.${fingerprint(styles)}.css`;
  const jsName = `script.${fingerprint(script)}.js`;
  const compile = (html) => {
    const compiled = html
      .replaceAll('{{header}}', header)
      .replaceAll('{{footer}}', footer)
      .replaceAll('{{styles}}', cssName)
      .replaceAll('{{script}}', jsName)
      .replace(/\{\{icon:([a-z]+)\}\}/g, (_, name) => icon(name));
    if (/\{\{.*?\}\}/.test(compiled)) throw new Error('Unresolved template token');
    return compiled;
  };
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  await cp(`${source}assets`, `${output}assets`, { recursive: true });
  await Promise.all([
    ...pages.map(async (page) =>
      writeFile(`${output}${page}`, compile(await readFile(`${source}${page}`, 'utf8'))),
    ),
    writeFile(`${output}${cssName}`, styles),
    writeFile(`${output}${jsName}`, script),
    writeFile(`${output}robots.txt`, 'User-agent: *\nAllow: /\n'),
  ]);
  console.log('Built static website → dist/');
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await build();
