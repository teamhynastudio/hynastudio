import fs from 'fs';
import path from 'path';

const distAssets = path.resolve('dist/assets');
const targetAssets = path.resolve('../../../assets');
const hynabizHtml = path.resolve('../../../hynabiz.html');

if (fs.existsSync(distAssets)) {
  fs.cpSync(distAssets, targetAssets, { recursive: true });
  console.log('Copied assets to:', targetAssets);

  const files = fs.readdirSync(distAssets);
  const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
  const cssFile = files.find(f => f.startsWith('index-') && f.endsWith('.css'));

  if (jsFile && cssFile && fs.existsSync(hynabizHtml)) {
    let html = fs.readFileSync(hynabizHtml, 'utf8');
    html = html.replace(/\/assets\/index-[^"]+\.js/, `/assets/${jsFile}`);
    html = html.replace(/\/assets\/index-[^"]+\.css/, `/assets/${cssFile}`);
    fs.writeFileSync(hynabizHtml, html, 'utf8');
    console.log(`Updated hynabiz.html with ${jsFile} and ${cssFile}`);
  }
}