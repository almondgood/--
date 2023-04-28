const relay = require('../PIModule/relay.js'); // 하위모듈에서 relay 객체추출
const RELAY = 19;

relay.Init(RELAY);
setImmediate(relay.toggle); // 릴레이스위치 점멸제어

process.on('SIGINT', function () {
    relay.Exit(); // 릴레이스위치 해제
    console.log("프로그램이 종료됩니다");
    process.exit();
});