const { testTimeout, unregisterCustomQueryHandler } = require("puppeteer");
const { TimeoutSettings } = require("puppeteer");
const { clickElement, getTextFormLink, getTextFromSelector } = require("./lib/commands");

let page;

describe ("test suit in 3 tests, 2 happy, 1 sad", () => {
    beforeEach (async ()=> {
        page = await browser.newPage();
        await page.goto("http://qamid.tmweb.ru/client/index.php");
        clickElement(page, ".movie-seances__time:not(.acceptin-button-disabled)");
    })

    afterEach (()=> {
        page.close();
    })

    test("should buy one ticket to a first avable show on a page today on a free seat", async () => {
        clickElement(page, ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)");
        clickElement(page, ".acceptin-button");
        clickElement(page, ".acceptin-button");        
        let actual = await getTextFromSelector(page, ".ticket__hint");
        
        expect(actual).toEqual("После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.");
    });
    
    test ("should buy two tickets to today show on a free seat", async () => {
        clickElement(page, ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)");
        clickElement(page, `div > span:not(.buying-scheme__chair_selected):not(.buying-scheme__chair_taken)`);
        clickElement(page, ".acceptin-button");
        clickElement(page, ".acceptin-button");        
        let actual = await getTextFromSelector(page, ".ticket__hint");
        expect(actual).toEqual("После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.");

    });
 
    test ("Can`t by one ticket to today on unavable seat", async () => {
        await page.waitForSelector(".buying-scheme__chair_taken");
        await page.click(".buying-scheme__chair_taken");
        await console.error(`Selector is not clickable: .buying-scheme__chair_taken`);
    });
    
})