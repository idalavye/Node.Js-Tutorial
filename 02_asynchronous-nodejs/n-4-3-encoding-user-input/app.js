const request = require('request');
const yargs = require('yargs');

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
    .alias('help','h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);

request({
    url: 'http://www.mapquestapi.com/geocoding/v1/address?key=32MiO7Hc38ckeZxvZktAmbcm5XiTyep7&location=' + encodedAddress,
    json: true
}, (error, response, body) => {
    //console.log(body.results[0].locations[0]);
    // console.log(JSON.stringify(body.results[0],undefined,2));
    // console.log(JSON.stringify(body.results[0].locations[0].latLng.lat, undefined, 2));
    // console.log(JSON.stringify(body.results[0].locations[0].latLng.lng, undefined, 2));
    
    console.log(`Address: ${body.results[0].locations[0].street} ${body.results[0].locations[0].adminArea5} ${body.results[0].locations[0].adminArea1}` );
    console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
    console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
});

// encodeURIComponent('Hisarardı Mh Seyh Samil Cad...');
// decodeURIComponent('Hisarardı%20Mh%20Seyh%samil...');


/**
The latitude is stored on the response body here: body.results[0].locations[0].latLng.lat
The longitude is stored on the response body here: body.results[0].locations[0].latLng.lng
 */