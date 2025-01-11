function DelayFn(time){
    return new Promise((resolve)=>setTimeout(resolve, time));
}

async function DelayGreatingFn(name){
    console.log('wait 2 sec')
    await DelayFn(2000);
    console.log(name)
    console.log('process end')
}

DelayGreatingFn('hamid')
console.log('end')