const yargs = require('yargs');
const request = require('request');

const geocode = require('./geocode/geocode');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true //mutlaka string bir ifade girmesi için
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

//asyncronous function yaratıyoruz....
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results,undefined,2));
    }
});

request({
    url: 'https://api.darksky.net/forecast/b795b7962158106d5fd0246b932c3824/37.8267,-122.4233',
    json: true
}, (error, response, body) => {

    if (!error && response.statusCode === 200) {
        console.log(body.currently.temperature);
    } else {
        console.log('Unable to fetch weather');
    }

});


// encodeURIComponent('Hisarardı Mh Seyh Samil Cad...');
// decodeURIComponent('Hisarardı%20Mh%20Seyh%samil...');


/**
The latitude is stored on the response body here: body.results[0].locations[0].latLng.lat
The longitude is stored on the response body here: body.results[0].locations[0].latLng.lng
 */