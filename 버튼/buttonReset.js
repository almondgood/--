import pigpio, { Gpio } from 'pigpio'

const gpio = require('pigpio').Gpio;

const rled = new gpio(21, {mode: gpio.OUTPUT});
const bled = new gpio(16, {mode: gpio.OUTPUT});
const gled = new gpio(12, {mode: gpio.OUTPUT});
const button = new gpio(20, {mode: gpio.INPUT, edge: gpio.EITHER_EDGE});

let start;
let end;

button.glitchFilter(100000);
bled.digitalWrite(1);

const Handler = (level, tick) => {

    if (level === 0) {
        console.log("버튼을 눌렀습니다.");
        start = new Date().getTime();
        rled.digitalWrite(1);
        bled.digitalWrite(1);
        gled.digitalWrite(1);
    }
    else {
        console.log("버튼을 뗐습니다.");
        end = new Date().getTime();

        if (end - start > 5000) {
            console.log("리셋됩니다.");
            rled.digitalWrite(0);
            bled.digitalWrite(1);
            gled.digitalWrite(0);
            return;
        }
        rled.digitalWrite(0);
        bled.digitalWrite(0);
        gled.digitalWrite(1);
    }

}

button.on('interrupt', Handler);

process.on('SIGINT', function() {
    rled.digitalWrite(0);
    bled.digitalWrite(0);
    gled.digitalWrite(0);
    console.log(" 프로그램이 종료됩니다.... ");
    process.exit();
})
