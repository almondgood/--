import pigpio, { Gpio } from 'pigpio'

const gpio = require('pigpio').Gpio;

const rled = new gpio(21, {mode: gpio.OUTPUT});
const gled = new gpio(12, {mode: gpio.OUTPUT});
const buzzer = new gpio(26, {mode: gpio.OUTPUT});
const button = new gpio(20, {mode: gpio.INPUT, alert: true});

let rledPower;
let blink;

button.glitchFilter(100000);
gled.digitalWrite(1);

const Handler = (level, tick) => {

    if (level === 0) {

        console.log("버튼을 눌렀습니다.");    

        buzzer.digitalWrite(1);
        gled.digitalWrite(0);
        rledPower = 1;
        rled.digitalWrite(rledPower);
        
        blink = setInterval(buttonOn, 1000);
    }
    else {
        console.log("버튼을 뗐습니다.");
        clearTimeout(blink)

        buzzer.digitalWrite(0);
        rled.digitalWrite(0);
        gled.digitalWrite(1);
    }

}

const buttonOn = () => {
    rledPower = rledPower === 0 ? 1 : 0;
    rled.digitalWrite(rledPower);
}

button.on('alert', Handler);

process.on('SIGINT', function() {
    rled.digitalWrite(0);
    gled.digitalWrite(0);
    buzzer.digitalWrite(0);
    console.log(" 프로그램이 종료됩니다.... ");
    process.exit();
})
