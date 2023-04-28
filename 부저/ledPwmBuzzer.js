import pigpio, { Gpio } from 'pigpio'

const gpio = require('pigpio').Gpio;
const led = new gpio(21, {mode: Gpio.OUTPUT});
const buzzer = new gpio(26, {mode: Gpio.OUTPUT});

let dutyCycle = 0;
let speed = 20;

const fadeIn = () => {

    led.pwmWrite(dutyCycle);
    if (dutyCycle < 254) {
        dutyCycle += 2;
        setTimeout(fadeIn, speed);
    }
    else {
        buzzer.digitalWrite(0);
        console.log("어두워짐 ...");
        setTimeout(fadeOut, speed);
    }
}

const fadeOut = () => {

    led.pwmWrite(dutyCycle);
    if (dutyCycle > 2) {
        dutyCycle -= 2;
        setTimeout(fadeOut, speed);
    }
    else {
        buzzer.digitalWrite(1);
        console.log("밝아짐 ...");
        setTimeout(fadeIn, speed);
    }
}

process.on('SIGINT', function() {
    led.digitalWrite(0);
    buzzer.digitalWrite(0);
    console.log(" 프로그램이 종료됩니다.... ");
    process.exit();
})
