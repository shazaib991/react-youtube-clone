
const fs = require('fs');
const parser = require('@babel/parser');
const code = fs.readFileSync('c:/Users/shazaib munawar/Documents/frontend-web/react-youtube-clone/src/components/HomeSection/Video.jsx','utf-8');
try {
  parser.parse(code,{sourceType:'module', plugins:['jsx']});
  console.log('parse OK');
} catch(e) {
  console.error('parse error', e.message);
}
