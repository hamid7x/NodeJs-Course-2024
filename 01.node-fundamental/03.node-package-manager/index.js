const lodash  = require('lodash');

const names = ["hamid", "dadash",'kort'];
const capitalize = lodash.map(names, lodash.capitalize);

console.log(capitalize);