
const request = require('request');
const network = require('network'); // IP주소 획득용  

var myData = {
    userip: "",//x.x.x.x  
    userid: "user01"
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
            myData.userip = ifaces.ip_address;
            request.post({
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