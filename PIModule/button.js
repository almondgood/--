const gpio = require('pigpio').Gpio;

const Button = {

    button : null,
    flag: 0,
    on : null,
    off : null,

    Init : (pin) => {
        button = new gpio(pin, {mode : gpio.INPUT, edge : Gpio.FALLING_EDGE});
        button.glitchFilter(100000);
        button.on('interrupt', flag);
        console.log("버튼 활성화");
    },

    flag : (level, tick) => {
        if (button.flag == 1) {
            button.off;
            button.flag = 0;
        }
        else {
            button.on;
            button.flag = 1;
        }
    },

    register: (on, off) => {
        button.on = on();
        button.off = off();
    }

}

module.exports.Init = function(pin) {Button.Init(pin)};
module.exports.RegisterFunc = function(on, off) {Button.register(on, off)};


