const expect = require("chai").expect;
const sinon = require("sinon");

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
});
