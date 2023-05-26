const request = require('request');
const network = require('network'); // IP주소 획득용  

var myData = {
    deviceid: "",
    degree:'180'
}

const PORT = 60001;

network.get_active_interface((err, ifaces) => { // WiFi IP주소(라즈베리파이)획득 
    let myUrl;
    if (ifaces !== undefined) {
        if (ifaces.name == 'wlan0') {
            console.log("===================================================");
            console.log('IP주소:' + ifaces.ip_address + ':' + PORT);
            console.log("REST API 서버로 서보모터 제어 명령을 전송합니다");
            console.log("===================================================");
            myUrl = 'http://' + ifaces.ip_address + ':' + PORT + '/motor';
            myData.deviceid = 'dev123';
            myData.degree = (Math.floor(Math.random() * 10) % 3) * 90;
            console.log(`제어 각도 : ${myData.degree}`);
            request.put({
                url: myUrl,
                form: myData,
                headers: { "content-type": "application/x-www-form-urlencoded" }
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log('REST API 서버로부터 수신한 응답 : ' + body)
                }
            });
        }/*if*/
    }/*if*/
});