const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddress = encodeURIComponent(argv.address);
console.log(encodedAddress);
var geocodeUrl = 'http://www.mapquestapi.com/geocoding/v1/address?key=32MiO7Hc38ckeZxvZktAmbcm5XiTyep7&location=' + encodedAddress;

axios.get(geocodeUrl).then((response) => {

    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }

    var lat = body.results[0].locations[0].latLng.lat;
    var lng = body.results[0].locations[0].latLng.lng;
    var weatherUrl = `https://api.darksky.net/forecast/b795b7962158106d5fd0246b932c3824/${lat},${lng}`;
    console.log(response.data);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It's feels like ${apparentTemperature}.`);
})
    .catch((error) => {

        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers');
        } else {
            console.log(error.message);
        }

        console.log(error);
    });