const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("Auth Controller - Login", function() {
  it("should throw an error with code 500 if accessing the database fails", function(done) {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "test@test.com",
        password: "test"
      }
    };

    /**
     * Eğer burada done kullanmazsak mocha bu test senaryosunun bitmesini beklemez çünkü bu async bir kod.
     */

    AuthController.login(req, {}, () => {}).then(result => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      /**
       * Done buradaki tüm async işlevlerinin bitmesini bekler ve sonrasında test işleminin geçip geçmediğini söyler.
       * done aslında mocha tarafında birinci parametrede sağlanan bir fonksiyondur.
       */
      done();
    });

    User.findOne.restore();
  });

  it("should send a response with a valid user status for an existing users", function(done) {
    mongoose
      .connect("mongodb://localhost:27017/testapp-test")
      .then(result => {
        const user = new User({
          email: "test@test.com",
          password: "testet",
          name: "Test",
          posts: [],
          _id: "5c0f66b979af55031b34728a"
        });

        return user.save();
      })
      .then(() => {
        const req = { userId: "5c0f66b979af55031b34728a" };
        const res = {
          statusCode: 500,
          userStatus: null,
          status: function() {
            this.statusCode = code;
            return this;
          },
          json: function(data) {
            this.userStatus = data.status;
          }
        };
        AuthController.getUserStatus(req, res, () => {}).then(() => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.userStatus).to.be.equal("I am new!");
          done();
        });
      })
      .catch(err => console.log(err));
  });
});
