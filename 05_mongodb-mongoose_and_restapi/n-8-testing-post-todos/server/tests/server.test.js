const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require('../models/todo');


beforeEach((done) => {//Herbir request çağrısından önce bu metot çalışyor ve boş bir veri tabanı ile çalışmamızı sağlıyor.
    Todo.remove({}).then(() => {
        done();
    });
});


describe('POST /todos', () => {
    it('should create a new todo', (done) => { //test cases

        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text }) //supertest bizim için json formatına dönüştürecek
            .expect(200)
            .expect((res) => { //custom expect
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) { //Yuarıdaki epectlerde bir hata çıkarsa bu if'in içerisine girecek
                    return done(err);
                }

                //mongodb ye ekleyip eklemediğini kontrol etmek için;
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((err) => {
                    console.log(err);
                });
            });
    });

});
