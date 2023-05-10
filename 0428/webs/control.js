const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fs = require('fs');
const led = require('../sensors/led.js'); // led 객체추출
const buzzer = require('../sensors/buzzer.js'); // buzzer 객체추출
const humitemp = require('../sensors/humitemp.js'); // 온습도객체추출
const lcd = require('../sensors/lcd.js'); // lcd 객체 추출

const ON = 1;  // 상수정의
const OFF = 0;  // 정의

var redstate = '#b0b0b0'; // OFF 상태색 회색
var bluestate = '#b0b0b0'; // OFF 상태색 회색
var greenstate = '#b0b0b0'; // OFF 상태색 회색
var buzzerstate = '#b0b0b0'; // OFF 상태색 회색
var humitempData = null;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const mainPage = (req, res) => {
    fs.readFile('views/page.ejs', 'utf8', (error, data) => {
        if (error)
            res.sendStatus(500); // 오류코드 전송
        else 
            res.send(ejs.render(data, {
                redcolor: redstate,
                bluecolor: bluestate,
                greencolor: greenstate,
                buzzercolor: buzzerstate,
                humitemp: humitempData
            }));
    });
};

const redOn = (req, res) => {
    led.turn('red', ON);
    redstate = "#ff0000";
    res.redirect('/');
}

const redOff = (req, res) => {
    led.turn('red', OFF);
    redstate = "#b0b0b0";
    res.redirect('/');
}

const blueOn = (req, res) => {
    led.turn('blue', ON);
    bluestate = "#0000ff";
    res.redirect('/');
}

const blueOff = (req, res) => {
    led.turn('blue', OFF);
    bluestate = "#b0b0b0";
    res.redirect('/');
}

const greenOn = (req, res) => {
    led.turn('green', ON);
    greenstate = "#00ff00";
    res.redirect('/');
}

const greenOff = (req, res) => {
    led.turn('green', OFF);
    greenstate = "#b0b0b0";
    res.redirect('/');
}

const buzzerOn = (req, res) => {
    buzzer.turnOn();
    buzzerstate = "#ff0000";
    res.redirect('/');
}

const buzzerOff = (req, res) => {
    buzzer.turnOff();
    buzzerstate = "#b0b0b0";
    res.redirect('/');
}

const readHumitemp = (req, res) => {
    console.log('readHumitemp()');
    humitemp.read().then(ht => humitempData = ht);
    
    res.redirect('/');
}

const printMessage = (req, res) => {
    let line1 = req.body.line1;
    let line2 = req.body.line2;

    lcd.printMessage(line1, line2);
    res.redirect('/');
}

const control = {
    init: () => {
        led.init(19, 20, 16);
        buzzer.init(26);
        humitemp.init(21);
        lcd.init();
    },

    exit: () => {
        led.allOff();
        buzzer.turnOff();
        lcd.clear();
    }
}

router.get('/', mainPage);
router.get('/led/red/on', redOn);
router.get('/led/red/off', redOff);
router.get('/led/blue/on', blueOn);
router.get('/led/blue/off', blueOff);
router.get('/led/green/on', greenOn);
router.get('/led/green/off', greenOff);
router.get('/buzzer/on', buzzerOn);
router.get('/buzzer/off', buzzerOff);
router.get('/humitemp', readHumitemp);
router.post('/lcd/display', printMessage);

module.exports = router;
module.exports.init = control.init;
module.exports.exit = control.exit;