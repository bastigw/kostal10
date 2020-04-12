const puppeteer = require('puppeteer')
const globalConfig = require('../global.config')
const axios = require('axios');

function getSessionKey(storage) {
    return JSON.parse(Object.values(storage)[0]).sessionKey
}

async function login() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(
        `${globalConfig.plentiURL}/#/login`,
        {
            waitUntil: 'networkidle2',
        }
    )

    //password
    await page.waitForSelector("#gid_2736fab2_4")
    await page.type("#gid_2736fab2_4", globalConfig.plentiPass)


    // we find the Login btn using the innerText comparison because the selector used for the btn might be unstable
    await page.evaluate(() => {
        let btn = document.querySelector("#gid_2736fab2_7")
        btn.click()
    })
    const waitSec = 3
    await page.waitFor(waitSec * 1000)

    const storage = await page.evaluate(() => {
        let json = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            json[key] = sessionStorage.getItem(key);
        }
        return json;
    })
    const sessionKey = getSessionKey(storage)
    browser.close()
    return sessionKey
}

function logout() {
    axios.post(`${globalConfig.plentiURL}/api/v1/auth/logout`, {}, globalConfig.reqConfig).then((response) => {
        if (response.status === 200) {
            console.log("Logout worked as supposed");
        } else {
            console.log(response)
            console.log("Check response if everything worked");
        }
    }).catch((err) => {
        console.error(err);
    });
}


exports.login = login
exports.logout = logout