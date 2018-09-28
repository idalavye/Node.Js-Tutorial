const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
    id: 10
}

//bu kullanıcıların üye oldukları veya giriş yaptıkları zaman göndereceğimiz tokendır..
var token = jwt.sign(data, '123abc');
console.log(token);

//Burdan gelen bilgilere göre kullnıcıya izinler tanımlayabiliriz.
var decoded = jwt.verify(token, '123abc');
console.log(decoded);





// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message ${message}`);
// console.log(`Hash ${hash}`);

// var data = {
//     id: 4
// }

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// var resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();
// console.log(token);
// console.log(resultHash);

// if(resultHash == token.hash){
//     console.log('Data was not changed');
// }else{
//     console.log('Data wass changed. Do not trust')
// }