const sonic = require('../PIModule/sonic.js');
const button = require('../PIModule/button.js');

const TRIG = 13;
const ECHO = 6;
const BUTTON = 16;

sonic.Init(TRIG, ECHO);
sonic.Detect();

button.Init(BUTTON);
button.RegisterFunc(sonic.Enable, sonic.Disable);

process.on('SIGINT', function () {
    sonic.Disable();
    console.log("프로그램이 종료됩니다");
    process.exit();
});