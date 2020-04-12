const globalConfig = require('./global.config')
const plenticore = require('./helpers/plenticore');
const axios = require('axios');

async function main() {
    const sessionKey = await plenticore.login()
    globalConfig.headers.Authorization = `Session ${sessionKey}`

    const method = 'get' // or 'post' or 'put
    const url = `${globalConfig.plentiURL}${globalConfig.settingsAPI}` // endpoint
    let data = [
        {
            "moduleid": "devices:local",
            "settings": [
                {
                    "id": "Battery:MinSoc",
                    "value": "10"
                }
            ]
        }
    ] // payload
    const headers = globalConfig.headers

    const request = {
        method,
        url,
        data,
        headers
    }


    axios(request).then((response) => {
        if (method === 'get') {
            console.log(response.data);
        }
        if (response.status === 200) {
            console.log("Everything worked as supposed");
        } else {
            console.log(response)
            console.log("Check response if everything worked");
        }
    }).catch((err) => {
        console.error(err);
    }).then(() => {
        plenticore.logout()
    })


}

main()