const express = require('express');
const os = require('os');
const app = express();
const control = require('./webs/control.js');

const PORT = 65000; // PORT 주소 설정

app.use('/', control);

app.listen(PORT, () => {
    let ifaces = os.networkInterfaces();

    console.log("--------------웹제어서버 가동-------------");
    console.log("센서모듈을 초기화합니다");
    control.init(); // 센서모듈 초기화
    console.log("-----------------------------------");
    console.log("웹브라우져에서 아래주소로 접속하세요");
    console.log('서버실행 : ' + ifaces.wlan0[0].address + ':' + PORT);
    console.log("-----------------------------------");

    process.on('SIGINT', function (signal) {
        console.log(` ${signal} 프로그램이 종료됩니다.`);
        control.exit(); // 센서모듈 종료처리
        process.exit();
    });
})