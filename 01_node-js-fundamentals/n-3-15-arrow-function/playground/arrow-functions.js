// var square = (x) => {
//     var result = x * x;
//     return result;
// }

// console.log(square(9));


// var square = (x) => x * x;
//console.log(square(9));

var user = {
    name : 'İbrahim',
    //arrow function
    sayHi : () => {
        console.log(arguments);
        console.log(`Hi. I'm ${this.name}`);
    },
    //regular(düzenli) function
    sayHiAlt () {
        console.log(arguments);
        console.log(`Hi. I'm ${this.name}`);
    }
}

user.sayHi(1,2,3);
user.sayHiAlt(1,2,3);