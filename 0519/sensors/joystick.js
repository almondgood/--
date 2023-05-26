const mcpadc = require('mcp-spi-adc'); // MCP3208 제어모듈
const SPI_SPEED = 1000000    // Clock Speed = 1Mhz
const VRX = 0   // ADC 0번째 채널 선택 = 아날로그 센서
const VRY = 1   // ADC 1번째 채널 선택 = 아날로그 센서

const joyStick = {

    joyX: 0,
    joyY: 0,
    webio: 0, // 소켓
    timerId: 0,

    init: (io) => {
        joyStick.joyX = mcpadc.openMcp3208(VRX,
            { speedHz: SPI_SPEED },
            (err) => {
                console.log("SPI 채널 0 초기화 완료");
                console.log("==========================");
                if (err) {
                    console.log("채널 0 초기화 실패(HW점검)");
                    process.exit();
                }
            }
        );

        joyStick.joyY = mcpadc.openMcp3208(VRY,
            { speedHz: SPI_SPEED },
            (err) => {
                console.log("SPI 채널 1 초기화 완료");
                console.log("==========================");
                if (err) {
                    console.log("채널 1 초기화 실패(HW점검)");
                    process.exit();
                }
            }
        );

        joyStick.webio = io;
    },

    read: () => {
        let xvalue = -1, yvalue = -1;

        joyStick.joyX.read((error, reading) => {
            xvalue = reading.rawValue;
            joyStick.joyY.read((error, reading) => {
                yvalue = reading.rawValue;
                console.log("X좌표 : %d         Y좌표 : %d", xvalue, yvalue);

                if (xvalue != -1 && yvalue != -1) {
                    joyStick.webio.sockets.emit('watch', xvalue, yvalue);
                    xvalue = yvalue = -1;
                }
            });
        });
    },

    start: (timerValue) => {
        if (joyStick.timerId == 0) {
            joyStick.timerId = setInterval(joyStick.read, timerValue);
        }
        else {
            console.log("이미 가동중입니다");
        }
    },

    stop: () => {
        if (joyStick.timerId != 0)
            clearInterval(joyStick.timerId);
        joyStick.timerId = 0;
    },

    terminate: () => {
        joyStick.joyX.close(() => {  //mcp3208연결해제  
            joyStick.joyY.close(() => {
                console.log('MCP-ADC를 해제하고,웹 서버를 종료합니다');
                process.exit();
            });
        });
    }

}

module.exports.init = joyStick.init;
module.exports.read = joyStick.read;
module.exports.start = joyStick.start;
module.exports.stop = joyStick.stop;
module.exports.terminate = joyStick.terminate;