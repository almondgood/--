const mcp = require('../PIModule/mcp.js');

const SOUND = 0; // 사운드센서는 0번 채널로 연결
const SOUND_NAME = "사운드 센서"
const LIGHT = 1; // 조도센서를 1번 채널로 연결
const LIGHT_NAME = "조도 센서"

mcp.init(SOUND, SOUND_NAME); // 사운드센서용 ADC 초기화
mcp.init(LIGHT, LIGHT_NAME); // 조도센서용 ADC 초기화

setImmediate(mcp.start, SOUND, 100); // 측정시작
setImmediate(mcp.start, LIGHT, 200); // 측정시작

process.on('SIGINT', function () {
    mcp.stop(SOUND); // 측정종료
    mcp.stop(LIGHT); // 측정종료
    console.log("프로그램이 종료됩니다");
    process.exit();
});