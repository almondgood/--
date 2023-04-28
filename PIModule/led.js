const gpio = require('pigpio').Gpio;

const led = {

    redLed: null,
    blueLed: null,
    greenLed: null,

    Init: (r, g, b) => {
        redLed = new gpio(r, { mode: gpio.OUTPUT });
        greenLed = new gpio(g, { mode: gpio.OUTPUT });
        blueLed = new gpio(b, { mode: gpio.OUTPUT });
        console.log("LED 활성화");
        led.Off();
    },

    Blue: () => {
        redLed.digitalWrite(0);
        greenLed.digitalWrite(0);
        blueLed.digitalWrite(1);
    },

    PwmBlue: (dutycycle) => {
            blueLed.pwmWrite(dutycycle);
        },

    Off: () => {
        redLed.digitalWrite(0);
        greenLed.digitalWrite(0);
        blueLed.digitalWrite(0);
    },

    Red: () => {
        redLed.digitalWrite(1);
        greenLed.digitalWrite(0);
        blueLed.digitalWrite(0);
    },

    Green: () => {
        redLed.digitalWrite(0);
        greenLed.digitalWrite(1);
        blueLed.digitalWrite(0);
    }
}

module.exports.Init = function (r, g, b) { led.Init(r, g, b); };
module.exports.Red = function () { led.Red(); };
module.exports.Blue = function () { led.Blue(); };
module.exports.Green = function () { led.Green(); };
module.exports.Off = function () { led.Off(); };
module.exports.PwmBlue = function (dutycycle) { led.PwmBlue(dutycycle); };

