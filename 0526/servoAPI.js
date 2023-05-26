const express = require('express');
const servo = require('./sensors/servo.js');
const bodyParser = require('body-parser');
const network = require('network');
const app = express();
const PORT = 60001;  //mydata를 이용하면 소스코드를 확장하여 제어가능함  

//현재 코드는 mydata의 템플릿만 보여주는 용도로 표현  
var mydata = {
    userip: null, // 디바이스 인증용 ip주소 
    userid: null, // 디바이스 인증용 사용자id  
    deviceid: null // 디바이스 id  
};
app.use(bodyParser.urlencoded({ extended: false })); //body-parser 모듈 초기화(http의 body로 데이터를 받으려면) 

const deviceInstall = (req, res) => {
    let info = req.body;
    console.log(`디바이스등록 : ${info.userip} > ${info.userid}`);
    servo.init(13); // pin13(서보모터연결) 
    mydata.userip = info.userip; // 등록 요청한 디바이스의ip주소 
    mydata.userid = info.userid; // 등록 요청한 사용자id 
    mydata.deviceid = "dev123"; // 디바이스 id를 발급 
    res.send({ "msg": "등록 성공", "deviceid": mydata.deviceid });
}

const moveServo = (req, res) => {
    let info = req.body;
    console.log(`디바이스 제어 : ${info.deviceid} > ${info.degree}`);

    if (info.deviceid == mydata.deviceid) { // 디바이스 인증 검증  

        switch (info.degree) {
            case '90':
                servo.move90();
                break; // 90도 제어 

            case '180':
                servo.move180();
                break; // 180도 제어  

            case '0':
                servo.move0();
                break; // 0도 제어  

            default: break;
        }
        res.send("서보모터회전제어(PUT)를완료하였습니다");
    } else {
        console.log("디바이스인증실패");
        res.send("디바이스인증실패:디바이스인증을먼저해주세요");
    }
}
const deviceRemove = (req, res) => {
    let info = req.body;
    console.log(`디바이스제거 : ${info.deviceid}`);
    servo.exit();

    if (mydata.deviceid == info.deviceid) { // 현재 등록된 디바이스가 해제를 요청한다면  
        res.send("서보모터 해제 제어(DELETE)를 완료하였습니다");
        mydata = 0;
    } else
        res.send("디바이스 해제 실패 : 등록된 디바이스가 없습니다.");
}

app.post('/motor', deviceInstall);
app.put('/motor', moveServo);
app.delete('/motor', deviceRemove);

app.listen(PORT, () => {
    network.get_active_interface((err, ifaces) => { // WiFi IP주소(라즈베리파이) 획득 
        if (ifaces !== undefined) {
            if (ifaces.name == 'wlan0') {
                console.log("=====================================================");
                console.log('REST API 서버가 가동중입니다 http://' + ifaces.ip_address + ':' + PORT);
                console.log("다른 기기로부터 서보모터 제어 명령을 기다립니다");
                console.log("=====================================================");
                process.on('SIGINT', function () {
                    console.log(`\n서버가 종료됩니다`);
                    process.exit();
                });
            }
        }
    });
})