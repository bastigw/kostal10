# Kostal Plenticore 10 API

Controlling the Kostal Plenticore 10 API. 
If this software works in IOBroker is not tested. If you need more information about this package create an issue here.

## Warning

**This software comes without proper testing. It is not safe to use.**

## Description

It uses [puppetter](https://github.com/puppeteer/puppeteer) to complete the login phase. The generated sessionKey is used to send put request to the API. [axios](https://github.com/axios/axios) is used for sending the requests. 

## Usage

First of all clone this repository and install all packages. 

    git clone 
    npm install

You have to populate your `global.config.js` with your own data. The [global.config.example.js](global.config.example.js) contains all the necessary fields for your own config.
You can run the `plenti.js` file by

    npm run plenti


### Settings you can control

All Settings you can control can be found in [settings.json](settings.json)

The data sent to the API is built up in the following way:

    [
        {
            "moduleid": "devices:local", // moduleID of setting 
            "settings": [
                {
                    "id": "Battery:MinSoc", //ID of setting
                    "value": "10"  
                }
            ]
        }
    ]

# Contributions

Please create an Issue or Pull request

# License

MIT-License