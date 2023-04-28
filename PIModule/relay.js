const gpio = require('pigpio').Gpio;

const relaySwitch = {
    relay: null,

    Init: (pin) => {
        relay = new gpio(pin, { mode: gpio.OUTPUT });
        console.log("릴레이스위치 활성화");
        relay.digitalWrite(0);
    },

    on: () => {
        relay.digitalWrite(1);
        console.log("Relay On");
    },

    off: () => {
        relay.digitalWrite(0);
        console.log("Relay Off");
    },

    toggleOn: () => {
        relay.digitalWrite(1);
        console.log("LED on");
        setTimeout(relaySwitch.toggleOff, 1000);
    },

    toggleOff: () => {
        relay.digitalWrite(0);
        console.log("LED off");
        setTimeout(relaySwitch.toggleOn, 1000);
    },

    Exit: () => {
        relay.digitalWrite(0);
        console.log("릴레이스위치 비활성화");
    }
}

module.exports.Init = function (pin) { relaySwitch.Init(pin); };
module.exports.toggle = function () { relaySwitch.toggleOn(); };
module.exports.Exit = function () { relaySwitch.Exit(); };
module.exports.on = function () { relaySwitch.on(); };
module.exports.off = function () { relaySwitch.off(); };
