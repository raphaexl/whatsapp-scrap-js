const puppeter = require('puppeteer');
const rl  = require('readline'), readline = rl.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
);

const WHATSAPP_URL = 'https://web.whatsapp.com/';

async function scrape(url, userName='', spamMsg='This is magic', nbSpams=100){
    const browser = await puppeter.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector(`span [title=${userName}]`);
    const target = await page.$(`span [title=${userName}]`);
    await target.click();
    //Find a solution to this one
    const input = await page.$(`#main > footer > div.vR1LG._3wXwX.copyable-area > div._2A8P4 > div > div._2_1wd.copyable-text.selectable-text`);

    for (let i = 0; i < nbSpams; i++) {
        await input.type(spamMsg);
        await page.keyboard.press('Enter');
    }
    readline.close();
}

const  run = () => {
    readline.setPrompt('Username >');
    readline.prompt();
    readline.on('line', userName => {
        userName = userName.trim();
        scrape(WHATSAPP_URL, userName, 'Igore it Just a test Please !', 2);        
    });
    readline.on('close', _ => process.exit(0));
}

run();
