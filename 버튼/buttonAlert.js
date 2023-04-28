import pigpio from 'pigpio'

const gpio = require('pigpio').Gpio;

const button = new gpio(20, {mode: gpio.INPUT, alert: true});
const rled = new gpio(21, {mode: gpio.OUTPUT});
const bled = new gpio(16, {mode: gpio.OUTPUT});
var count = 0;
var nowTime;

button.glitchFilter(100000);

const CheckButton = (level, tick) => {
    nowTime = new Date().toLocaleTimeString();
    if (level === 0) {
        console.log(++count + ' Button down ' + nowTime);
        rled.digitalWrite(1);
        bled.digitalWrite(0);
    }
    else {
        console.log(++count + ' Button up ' + nowTime);
        rled.digitalWrite(0);
        bled.digitalWrite(1);
    }
}

button.on('alert', CheckButton);

process.on('SIGINT', function() {
    rled.digitalWrite(0);
    bled.digitalWrite(0);
    console.log(" 프로그램이 종료됩니다.... ");
    process.exit();
})
