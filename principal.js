const puppeteer = require('puppeteer');
const { expect } = require('chai');

before (async function () {
	global.expect = expect;
    global.browser = await puppeteer.launch({headless: true});
});

after (function () {
	browser.close();
});