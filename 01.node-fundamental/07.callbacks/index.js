const person = (name, callBackFn)=>{
    console.log(`hello my name is, ${name}`)
    callBackFn();
}


const address = () => {
    console.log('morocco')
}

person('hamid', address)