const {add, sub, div} = require('./first-module');

try{
    console.log('file name: ', __filename)
    console.log('dir name: ', __dirname)
    console.log('try to divided by 0');
    let res = div(1, 1);
    console.log(res);
}catch(err){
    console.log('Error:', err.message)
}

