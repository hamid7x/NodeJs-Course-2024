const eventEmitter = require('events');

const myFirstEvent = new eventEmitter();

myFirstEvent.on('greet',(name)=>{
    console.log('hello ',name)
})


myFirstEvent.emit('gree','hamid oukaamouch')