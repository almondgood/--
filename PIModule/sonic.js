const gpio = require('pigpio').Gpio;
const led = require('./led.js');

const sonic = {

    trig: null,
    echo: null,
    trigPin: 13,   // TRIG 기본 핀번호
    echoPin: 6,     // ECHO 기본 핀번호
    distance: 0,    // 인체/ 물체 측정거리
    sid: 0,         //timer id(타임아웃 취소용)

    // 메소드 정의
    Init: function (trigpin = trigPin, echopin = echoPin) {
        trig = new gpio(trigpin, { mode: gpio.OUTPUT });
        echo = new gpio(echopin, { mode: gpio.INPUT, alert: true });
        trig.digitalWrite(0); // 초기신호 (TRIG Low)
        led.Init(12, 16, 21);
    },

    Enable: function () {
        console.log("초음파 활성화");
        sid = setInterval(() => { trig.trigger(10, 1); }, 200);
    },

    Disable: function () {
        if (sid) {
            clearTimeout(sid);
            sid = 0;
            console.log("초음파 비활성화");
        }
    },

    Detect: function () {
        let startTick, distance, diff;
        echo.on('alert', (level, tick) => {
            if (level == 1) { startTick = tick; }
            else {
                const endTick = tick;
                diff = endTick - startTick;
                distance = diff / 58; // cm환산법 = diff / 58

                if (distance < 400) {
                    console.log("근접거리 : %i cm", distance);
                    if (distance < 5) led.PwmBlue(255);
                    else if (distance >= 5 && distance < 10) led.PwmBlue(170);
                    else if (distance >= 10 && distance < 20) led.PwmBlue(100);
                    else if (distance >= 20 && distance < 50) led.PwmBlue(50);
                    else if (distance >= 50 && distance < 100) led.PwmBlue(5);
                    else led.PwmBlue(0);
                }
            }
        });
    }
}

module.exports.Init = function (trigpin, echopin) { sonic.Init(trigpin, echopin) };
module.exports.Enable = function () { sonic.Enable(); };
module.exports.Disable = function () { sonic.Disable(); };
module.exports.Detect = function () { sonic.Detect(); };