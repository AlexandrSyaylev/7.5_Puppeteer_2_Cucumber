const {Given, When, Then, Before, After} = require('cucumber');
const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const should = require('chai').should();
const { clickElement, getTextFromSelector, getTextFormLink } = require("C://Study/AutoJS/07_05/lib/commands.js");
const {setDefaultTimeout}= require('cucumber');

setDefaultTimeout(45000);
Before(async function () {
    const browser = await puppeteer.launch({ headless:false, slowMo:50 });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
    await this.page.goto("http://qamid.tmweb.ru/client/index.php");    
});
After(async function () {
    if (this.browser) {
        await this.browser.close();      
}});


Given('user go to first avaible seans', async function () {  
    return clickElement(this.page, ".movie-seances__time:not(.acceptin-button-disabled)");
});


When('user click on one first avaible seat and submith', async function () {
    clickElement(this.page, ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)");
    clickElement(this.page, ".acceptin-button");    
    return clickElement(this.page, ".acceptin-button");;
});

When('user click on first avaible seanses and check two avaible seat and submith', async function () {
    clickElement(this.page, ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)");
    clickElement(this.page, `div > span:not(.buying-scheme__chair_selected):not(.buying-scheme__chair_taken)`);
    clickElement(this.page, ".acceptin-button"); 
    return clickElement(this.page, ".acceptin-button");;
});

When('user click on first checked seat', async function () {
    return clickElement(this.page, ".buying-scheme__chair_taken");;
});



Then('the result should be {string}', async function (string) {
    let actual = await getTextFromSelector(this.page, ".ticket__hint");       
    console.log(actual);
    expect(actual).to.be.a(string);
});

Then('submit button in not avaible', async function () {
    await console.error(`Selector is not clickable: .buying-scheme__chair_taken`);
});