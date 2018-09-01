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
    /*
    //Burdaki error nesnesi sunucudan gelen bir hata değildir. Bizim gönderdiğimiz url'de olan bir hatadır.
    if(error){
        console.log('Unable to connect to Google Services');
    }else if(body.status === 'ZERO_RESULTS'){
        console.log('Unable to find that address');
    }
    */
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