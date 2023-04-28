const LCD = require('raspberrypi-liquid-crystal');
const lcd = new LCD(1, 0x27, 16, 2); // bus 1, I2C address(0x27), 16열x2행

const Lcd = {       // Lcd 객체를 정의

    message: ['Line 1 ', 'Line 2'], // 메시지내용을 초기화

    init: () => {
        console.log('LCD 모듈을 초기화합니다');
        lcd.beginSync();
        lcd.clearSync();
    },

    printMessage: (line1, line2) => {
        lcd.setCursorSync(0, 0); // 0번째줄 0번째칸으로 커서를 위치시킴
        lcd.printSync(line1); // 현재의 커서위치에서 line1 메시지를 출력함
        lcd.setCursorSync(0, 1); // 1번째줄 0번째칸으로 커서를 위치시킴
        lcd.printSync(line2); // 현재의 커서위치에서 line2 메시지를 출력함
    },

    clear: () => {
        lcd.clearSync();
    }
}
module.exports.init = function () { Lcd.init(); };
module.exports.printMessage = function (line1, line2) { Lcd.printMessage(line1, line2); };
module.exports.clear = function () { Lcd.clear(); };
