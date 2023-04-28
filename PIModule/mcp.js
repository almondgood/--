const mcpadc = require('mcp-spi-adc'); // MCP3208 제어 모듈
const SPI_SPEED = 1000000 // Clock Speed = 1Mhz

const mcp = {

    channel: 0,                    // ADC 채널 번호(아날로그 센서)
    sensor: [0, 0, 0, 0, 0, 0, 0, 0],     // 8채널용 아날로그 센서 객체 저장용
    sensorName: [0, 0, 0, 0, 0, 0, 0, 0],
    timerid: [-1, -1, -1, -1, -1, -1, -1, -1], // 8채널용 측정 타이머 id, 초기값 -1
    timeout: 200,                   // 타이머 제어용
    data: [],                       // 측정 데이터 저장용 

    init: (channel, sensorName) => {
        mcp.sensor[channel] = mcpadc.openMcp3208(channel,
            { speedHz: SPI_SPEED },    // Clock 속도 지정
            (err) => {          // 초기화 처리 후 콜백함수 등록
                mcp.sensorName[channel] = sensorName;
                console.log(`SPI 채널${channel} 초기화 완료!`);
                console.log("--------------------------");
                if (err) console.log(`채널${channel} 초기화 실패!(HW점검)`);
            });
       
    },

    readStart: (channel, samplingRate) => {
        mcp.channel = channel;
        mcp.timeout = samplingRate;
        mcp.sensor[channel].read((error, reading) => {
            if (!error) {
                mcp.data[channel] = reading.rawValue;
                console.log(`${mcp.sensorName[channel]} 채널${channel} > 측정값${mcp.data[channel]}`);
            }
        }); // read()
        if (mcp.timerid[channel] == -1) {
            mcp.timerid[channel] = setInterval(mcp.readStart, mcp.timeout,
                mcp.channel, samplingRate);
        }
    },

    readStop: (channel) => {
        console.log(`readStop: channel: ${channel}`);
        if (mcp.timerid[channel] !== -1) {
            clearInterval(mcp.timerid[channel]);
            mcp.timerid[channel] = -1;
        }
    }
}

module.exports.init = mcp.init;
module.exports.start = mcp.readStart;
module.exports.stop = mcp.readStop;
