
class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }

    getUser(id) {
        return this.users.filter((user) => {
            return user.id === id
        })[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) => {
            return user.room === room;
        });

        var namesArray = users.map((user) => {
            return user.name;
        });

        return namesArray;
    }
}

module.exports = { Users };
















// [{
//     id: '/#5465464564564',
//     name: 'İbra'
// }]

// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// }

// var me = new Person('İbrahim', 24);
// console.log(me.name);
// console.log(me.age);
// console.log(me.getUserDescription());