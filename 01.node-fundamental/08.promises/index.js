function delayFn(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

console.log("resolve promise start");
delayFn(2000).then(() => console.log("promise lecture will end in 2 s"));
console.log("end");

function divideFn(num1, num2) {
  return new Promise((resolve, reject) => {
    if (num2 === 0) {
       reject("we cannot performe the operation of dividing by 0");
    }
     resolve(num1 / num2);
  });
}

divideFn(10, 3)
  .then((res) => console.log("result: ", res))
  .catch((err) => console.log("error: ", err));


