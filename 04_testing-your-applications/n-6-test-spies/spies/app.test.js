const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App', () => {

    //Bu oluşturmuş olduğumuz db db.js gibi app.js içerisinde çalışacaktır. Yani sahte
    //bir(casus) db oluşturmuş olduk. Bunu kullanarakta test işlemlerimizi yapabiliriz.
    var db = {
        saveUser: expect.createSpy()
    };

    app.__set__('db', db);

    it('should call the spy correctly', () => {
        var spy = expect.createSpy();
        spy('İbrahim', 20);
        // expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('İbrahim', 20);
    });

    it('should call saveUser with user object', () => {
        var email = 'idalavye@gmail.com'
        var password = '123';

        app.handleSignup(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({ email, password })
    });
});