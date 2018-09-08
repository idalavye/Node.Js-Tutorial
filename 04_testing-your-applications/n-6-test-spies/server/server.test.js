const request = require('supertest'); //express ile yaptığımız işlemleri test etmek için kullanacağız
const expect = require('expect');

var app = require('./server').app;

describe('Server', () => {

    describe('GET /', () => {
        it('should return hello world exaple', (done) => {
            request(app)
                .get('/')
                .expect(404)
                .expect((res) => {
                    expect(res.body).toInclude({
                        error: 'Page not found.'
                    });
                })
                .end(done);
        });
    });

    describe('GET /users', () => {
        it('should return users', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toInclude({ name: 'İbrahim', age: 20 })
                })
                .end(done);
        });
    });

});