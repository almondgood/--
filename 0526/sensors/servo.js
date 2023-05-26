const Gpio = require('pigpio').Gpio;

const servo = {

    motor: null,

    init: (pin) => {
        motor = new Gpio(pin, { mode: Gpio.OUTPUT });
        console.log("servo:init()");
    },
    move0: () => {
        console.log("서보모터:0도회전");
        if (motor != null) motor.servoWrite(500);
    },
    move90: () => {
        console.log("서보모터:90도회전");
        if (motor != null) motor.servoWrite(1400);
    },
    move180: () => {
        console.log("서보모터:180도회전");
        if (motor != null) motor.servoWrite(2500);
    },
    pwm0to180: async (dutyCycle) => {
        if (motor != null) {
            while (dutyCycle < 2500) {
                await new Promise(resolve => setTimeout(resolve, 200));

                console.log(`서보모터: ${dutyCycle}`);
                dutyCycle += 10;
                motor.servoWrite(dutyCycle);
            }
        }
    },
    exit: () => {
        motor = null;
        console.log("servo:exit();");
    }
}
module.exports = servo; // servo 객체를 exports하는 간략 표현