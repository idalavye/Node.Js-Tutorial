const expect = require("chai").expect;
const sinon = require("sinon");

const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("Auth Controller - Login", function() {
  it("should throw an error with code 500 if accessing the database fails", function() {
    sinon.stub(User, "findOne");
    User.findOne.throw();

    expect(AuthController.login)

    User.findOne.restore();
  });
});
