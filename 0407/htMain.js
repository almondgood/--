const humitemp = require('../PIModule/humitemp.js');
const HTPIN = 21; // 온습도센서 <- 21번 (BCM)

humitemp.init(HTPIN);

console.log("================================================");
console.log("3초후부터 3초간격으로 온도와 습도를 측정합니다");
console.log("================================================");

setInterval(() => {humitemp.read();}, 3000);  // 측정주기 3초 3000 ms