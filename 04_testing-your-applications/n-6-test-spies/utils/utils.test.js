const expect = require('expect');

const utils = require('./utils');

describe('Utils', () => {

    describe('#add', () => {
        it('should add two numbers', () => {
            var res = utils.add(23, 56);
    
            expect(res).toBe(79);
            // expect(res).toBeA('number');
        });
    });

    it('should square a number', () => {
        var res = utils.square(3);

        expect(res).toBe(9).toBeA('number');
    });

    it('should set firstName and lastName ', () => {
        var res = utils.setName({
            age: 20,
            location: 'Sakarya'
        }, 'İbrahim Dağdelen');

        expect(res).toInclude({ firstName: 'İbrahim' }).toInclude({ lastName: 'Dağdelen' });
    });

    it('should async add two numbers', (done) => {
        utils.asyncAdd(4, 3, (sum) => {
            expect(sum).toBe(7).toBeA('number');
            done();
        });
    });

    it('should async square a number', (done) => {
        utils.asyncSquare(5, (square) => {
            expect(square).toBe(25).toBeA('number');
            done();
        });
    });

})

it('should expect some values', () => {
    // expect(12).toBeNot(12); //error
    // expect({ name: 'İbrahim' }).toNotEqual({ name: 'İbrahim' }); //error
    // expect([2,3,4]).toInclude(1); //error

    //> exclude = dışlamak
    expect({
        name: 'İbrahim',
        age: 20,
        location: 'Sakarya'
    }).toExclude({
        age: 21
    }); //true
});