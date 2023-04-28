const gpio = require('pigpio').Gpio;

const Led = {

    red: null,
    blue: null,
    green: null,

    Init: (r, g, b) => {
        red = new gpio(r, { mode: gpio.OUTPUT });
        green = new gpio(g, { mode: gpio.OUTPUT });
        blue = new gpio(b, { mode: gpio.OUTPUT });
    },

    turn: (led, power) => {
        if (led == 'red') red.digitalWrite(power);
        else if (led == 'blue') blue.digitalWrite(power);
        else if (led == 'green') green.digitalWrite(power);
    },

    allOff: () => {
        red.digitalWrite(0);
        green.digitalWrite(0);
        blue.digitalWrite(0);
    },
}

module.exports.init = function (r, g, b) { Led.Init(r, g, b); };
module.exports.allOff = function () { Led.allOff(); };
module.exports.turn = Led.turn;

