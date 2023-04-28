const humitemp = require('../PIModule/humitemp.js');
const relay = require('../PIModule/relay.js'); // 하위모듈에서 relay 객체추출
const lcd = require('../PIModule/lcd.js');

const RELAY = 20;
const HTPIN = 21; // 온습도센서 <- 21번 (BCM)

humitemp.init(HTPIN);
relay.Init(RELAY);
lcd.init();

console.log("================================================");
console.log("5초후부터 5초간격으로 온도와 습도를 측정합니다");
console.log("================================================");

let temp, humi;
let humiInitValue = 0;

const control = (ht) => {
    temp = ht[0];
    humi = ht[1];

    if (humiInitValue == 0) humiInitValue = humi;

    if (humi - humiInitValue >= 10)
        relay.on();
    else if (humi - humiInitValue <= -10)
        relay.off();

    lcd.printMessage("Computer Gachon", temp + 'C, ' + humi + '%');
}

setInterval(() => humitemp.read().then(ht => control(ht)), 5000);

process.on('SIGINT', () => {
    relay.off();
    lcd.clear();
    console.log("프로그램이 종료됩니다");
    process.exit();
});
