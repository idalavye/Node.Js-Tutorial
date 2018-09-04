const utils = require('./utils');

it('should add two numbers', () => {
    var res = utils.add(23, 56);

    if (res !== 79) {
        throw new Error(`Expected 44, but got ${res}`);
    }
});

it('should square a number', () => {
    var res = utils.square(3);
    
    if (res !== 9) {
        throw new Error(`Expected 9, but got ${res}`);
    }
});