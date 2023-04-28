const network = require('network');
const lcd = require('../PIModule/lcd.js');

lcd.init(); // LCD 초기화

network.get_active_interface((err, ifaces) => {  // WiFi IP주소(라즈베리파이)획득
    if (ifaces !== undefined) {
        if (ifaces.name == 'wlan0') {
            console.log('라즈베리파이 IP주소 : ' + ifaces.ip_address); 
            // 16자리(공백) 1234567890123456 영문자 / 숫자 / 특수문자만 출력됨
            lcd.printMessage('Computer Gachon', ifaces.ip_address); // LCD 출력
        }
    }
});