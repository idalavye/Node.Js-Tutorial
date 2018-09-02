var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === number && typeof b === number) {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 2500);
    });
};

/*
//chaining promises callback 
asyncAdd(5, 7).then((res) => {
    console.log('Result : ', res);
    return asyncAdd(res, 33);
}, (errorMessage) => {
    console.log(errorMessage);
}).then((res) => {
    console.log('Should be 45', res);
}, (errorMessage) => {
    console.log(errorMessage);
});
*/

/**
 * Yukarıdaki şekilde kullanırsak birinci function da hata olduğu zaman error metoduna girecek ama zincirin 
 * ikinci halkasındaki function nın success metoduna girecek ve hatalı sonuç üretecek. Bunu engellemek için 
 * aşağıdaki gibi ortak bir hata yakalama yöntemi olana catch kullanabiliriz.
 */

asyncAdd(5, 7).then((res) => {
    console.log('Result : ', res);
    return asyncAdd(res, 33);
}).then((res) => {
    console.log('Should be 45', res);
}).catch((errorMessage) => {
    console.log(errorMessage);
});



var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        /**
         * aşağıdakilerden sadece birini çağırır. Bu promise methodu ile daha doğru çalışan callback functionlar 
         * oluşturabiliriz.
         */
        resolve('Hey, It worked!');
        resolve('asdfsdf');
        reject('Unable to fullfill promise');
    }, 2500);
});

somePromise.then((message) => {
    console.log('Success : ', message);
}, (errorMessage) => {
    console.log('Error : ', errorMessage);
});

