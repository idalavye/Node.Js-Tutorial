var request = require('request');

const geocodeAddress = (address) => {

    return new Promise((resolve, reject) => {
        
        var encodedAddress = encodeURIComponent(address);

        request({
            url: 'http://www.mapquestapi.com/geocoding/v1/address?key=32MiO7Hc38ckeZxvZktAmbcm5XiTyep7&location=' + encodedAddress,
            json: true
        }, (error, response, body) => {
            /*
            //Burdaki error nesnesi sunucudan gelen bir hata değildir. Bizim gönderdiğimiz url'de olan bir hatadır.
            if(error){
                reject('Unable to connect to Google Services');
            }else if(body.status === 'ZERO_RESULTS'){
                reject('Unable to find that address');
            }
            */
            resolve({
                address: `${body.results[0].locations[0].street} ${body.results[0].locations[0].adminArea5} ${body.results[0].locations[0].adminArea1}`,
                latitude: `${body.results[0].locations[0].latLng.lat}`,
                longitude: `${body.results[0].locations[0].latLng.lng}`
            });
        });
    });

};

geocodeAddress('19146').then((location) => {
    console.log(location.address);
}, (errorMessage) => {
    console.log('Error');
});

