const yargs = require('yargs');

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
        console.log(JSON.stringify(results), undefined, 2);
    }
});


// encodeURIComponent('Hisarardı Mh Seyh Samil Cad...');
// decodeURIComponent('Hisarardı%20Mh%20Seyh%samil...');


/**
The latitude is stored on the response body here: body.results[0].locations[0].latLng.lat
The longitude is stored on the response body here: body.results[0].locations[0].latLng.lng
 */