const gpio = require('pigpio').Gpio;

const Buzzer = {

    buzzer: null,

    init: (pin) => {
        buzzer = new gpio(pin, {mode : gpio.OUTPUT});
    },

    turnOn: () => {
        buzzer.digitalWrite(1);
    },

    turnOff: () => {
        buzzer.digitalWrite(0);
    }
}

module.exports.init = Buzzer.init;
module.exports.turnOn = Buzzer.turnOn;
module.exports.turnOff = Buzzer.turnOff;
