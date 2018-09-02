const request = require('request');

var getWeather = (lat, lng, callback) => {

    request({
        url: `https://api.darksky.net/forecast/b795b7962158106d5fd0246b932c3824/${lat},${lng}`,
        json: true
    }, (error, response, body) => {

        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather');
        }

    });
}

module.exports.getWeather = getWeather;

