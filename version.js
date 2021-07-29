const { writeFileSync, readFileSync } = require('fs');
const package = require('./package.json');
const version = package.version.split('.').map((v) => parseInt(v));
let increment = 1;
for (let i = version.length - 1; i >= 0; i--) {
  if (version[i] >= 9) {
    if (i === 0) {
      version[i]++;
      break;
    }
    version[i] = 0;
    increment = 1;
  } else {
    version[i]++;
    break;
  }
}
package.version = version.join('.');
let content = readFileSync('./package.json').toString('utf8');
content = content.replace(
  /"version": "(\d+\.\d+\.\d+)"/,
  `"version": "${package.version}"`
);
writeFileSync('package.json', content);
