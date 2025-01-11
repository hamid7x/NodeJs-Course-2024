const path = require('path');

console.log('dir name: ', path.dirname(__filename));
console.log('file name: ', path.basename(__filename));
console.log('file extension: ', path.extname(__filename));


const joinPath = path.join('user','documents','node','projects');
console.log(joinPath);
const resolvePath = path.resolve('user','documents','node','projects');
console.log(resolvePath);