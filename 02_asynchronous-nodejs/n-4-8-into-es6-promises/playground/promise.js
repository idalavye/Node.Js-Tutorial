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

