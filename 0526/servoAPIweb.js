const express = require('express');
const fs = require('fs');
const servo = require('./sensors/servo.js');
const bodyParser = require('body-parser');
const network = require('network');
const app = express();
const methodOverride = require('method-override');
const PORT = 60001;

var mydata = {
    userip: null, // 클라이언트의 ip주소(등록/인증용) 
    userid: null, // 클라이언트의 사용자id(등록/인증용)  
    deviceid: null // 디바이스id(인증용)  
};

app.use(bodyParser.urlencoded({ extended: false }));//body-parser모듈초기화  
app.use(methodOverride('_method'));//method오버라이딩(put,delete,patch) 

const getServo = (req, res) => {
    fs.readFile('views/controlpage.html', 'utf8', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' });
        res.end(data);
        console.log("웹페이지에 접속하였습니다");
    });
}

const controlMotor = (req, res) => {
    let info = req.body;

    console.log(`웹기반 디바이스 제어 : ${info.userip} : ${info.userid} : ${info.deviceid} > ${info.degree}`);
    servo.init(13);//pin13 

    mydata.userip = info.userip;
    mydata.userid = info.userid;
    mydata.deviceid = info.deviceid;

    switch (info.degree) {
        case '90':
            servo.move90();
            break;

        case '180':
            servo.move180();
            break;

        case '0':
            servo.move0();
            break;

        default: break;
    }
    servo.exit();
    res.redirect('/');
}

const pwmMotor = async (req, res) => {
    servo.init(13);//pin13 
    await servo.pwm0to180(500);
    servo.exit();
    res.redirect('/');
}

app.post('/motor', pwmMotor);
app.put('/motor', controlMotor);// REST API 핸들러 바인딩 
app.get('/', getServo); // REST API 핸들러 바인딩  

app.listen(PORT, () => {
    network.get_active_interface((err, ifaces) => { // WiFi IP주소(라즈베리파이)획득  
        if (ifaces !== undefined) {
            if (ifaces.name == 'wlan0') {
                console.log("==================================================");
                console.log('REST API 웹서버가 가동중http://' + ifaces.ip_address + ':' + PORT);
                console.log("웹브라우져로 접속하세요");
                console.log("==================================================");
                process.on('SIGINT', function () {
                    console.log(`\n서버가 종료됩니다`);
                    process.exit();
                });
            }
        }
    });
});