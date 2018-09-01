const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=hisarard%C4%B1%20mh.%20seyh%20samil%20cad.%20no:33%20simav%20kutahya',
    json: true
}, (error, response, body) => {
    console.log(body);
});