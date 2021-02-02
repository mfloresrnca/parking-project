const puppeteer = require('puppeteer');
const { expect } = require('chai');


before (async function () {
	global.browser = await puppeteer.launch({headless: false});
	global.expect = expect;
});

after (function () {
	browser.close();
});