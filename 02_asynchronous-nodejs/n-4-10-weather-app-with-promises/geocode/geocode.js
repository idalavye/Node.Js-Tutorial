var request = require('request');

module.exports.geocodeAddress = (address, callback) => {

    var encodedAddress = encodeURIComponent(address, callback);
    request({
        url: 'http://www.mapquestapi.com/geocoding/v1/address?key=32MiO7Hc38ckeZxvZktAmbcm5XiTyep7&location=' + encodedAddress,
        json: true
    }, (error, response, body) => {
        /*
        //Burdaki error nesnesi sunucudan gelen bir hata değildir. Bizim gönderdiğimiz url'de olan bir hatadır.
        if(error){
            callback('Unable to connect to Google Services');
        }else if(body.status === 'ZERO_RESULTS'){
            callback('Unable to find that address');
        }
        */
        callback(undefined,{
            address:`${body.results[0].locations[0].street} ${body.results[0].locations[0].adminArea5} ${body.results[0].locations[0].adminArea1}`,
            latitude:`${body.results[0].locations[0].latLng.lat}`,
            longitude:`${body.results[0].locations[0].latLng.lng}`
        })

        
        /*
        console.log(`Address: ${body.results[0].locations[0].street} ${body.results[0].locations[0].adminArea5} ${body.results[0].locations[0].adminArea1}`);
        console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
        console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
        */
    });
}

