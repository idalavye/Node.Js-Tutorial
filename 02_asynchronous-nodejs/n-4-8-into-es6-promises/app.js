const yargs = require('yargs');
const request = require('request');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

//chaining callbacks...
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        // console.log(JSON.stringify(results, undefined, 2));
        console.log(`Address : ${results.address}`);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResult) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                // console.log(JSON.stringify(weatherResult, undefined, 2));
                console.log(`It's currently ${weatherResult.temperature}. It's feels like ${weatherResult.apparentTemperature}.`)
            }
        });
    }
});

