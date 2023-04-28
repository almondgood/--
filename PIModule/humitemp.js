const temp = require("node-dht-sensor");

const humitemp = {

    type: 22, // 기본값: DT22 (정밀온습도센서)
    pin: 21, //  기본값: 21, BCM 핀번호
    humi: 0.0,  // 초기값
    temp: 0.0,
    str: '',

    init: (number) => {
        humitemp.pin = number;
        console.log('초기화 pin : ' + humitemp.pin);
    },

    read: () => {
        let humistr = '';
        // 초기 값을 반환받지 않기 위해 동기 처리
        return new Promise((resolve) => {
            temp.read(humitemp.type, humitemp.pin, (err, temp, humi) => {

                if (!err) {
                    humitemp.temp = temp.toFixed(1); // 정밀표기 : 소수점 1자리
                    humitemp.humi = humi.toFixed(1); // 소수점 1자리
                    humitemp.str = new Date().toLocaleString('ko'); // 측정 일시
                    humistr = humitemp.temp + 'C,' + humitemp.humi + '%        ';
                    console.log('온도/습도 측정값: ' + humitemp.temp + 'C ' +
                        humitemp.humi + '% ' + humitemp.str);

                    resolve([humitemp.temp, humitemp.humi]);
                }
                else {
                    console.log(err);
                }
            });
        })
    } //read
}

module.exports.init = function(number) { humitemp.init(number);};
module.exports.read = function() { return humitemp.read()};