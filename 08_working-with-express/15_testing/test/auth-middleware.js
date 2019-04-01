const authMiddleware = require("../middleware/is-auth");
const expect = require("chai").expect;
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

describe("Auth middleware", function() {
  it("should throw an error if no authorization header is present", function() {
    const req = {
      get: function() {
        return null;
      }
    };
    /**
     * authMiddleware i kendi kullanımım için çağırmıyorum. Test  amacıyla çağırıyorum. Bu yüzden mocha ve chai hataları ayıklayabilmesi için
     * benim için kendileri çağırmalı. Aşağıdaki gibi bir kullanımda kendim test etmek zorunda kalacağım ve buda test etmenin tüm amacını bozacaktır.
     * Yani ara katman yazılımını doğrudan kendimiz buraya çağırmak yerine, bunun yerine sadece buna atıfta bulunmaktayız.
     */
    //   expect(authMiddleware(req, {}, () => {})).to.throw("Not authenticated.");

    /**
     * Artık burada kendimiz çağırmıyoruz.Bunun yerine, nerede olduğumuza göre hazırlandı diyebileceğiniz fonksiyonumuza hazırlıklı bir referans veriyoruz.
     */
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not authenticated."
    );
  });

  it("should throw an error if the authorization header is only one string", function() {
    const req = {
      get: function() {
        return "token";
      }
    };

    /**
     * İkinci parametre ve üçüncü parametre üzerinde bir test yapmadığımız için boş bir obje ve boş bir fonksiyon veriyoruz.
     */
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("should yield a userId after decoding the token", function() {
    const req = {
      get: function() {
        return "Bearer token";
      }
    };
    /**
     * orjinal verify metodunu override ediyoruz. Ve sanki valid bir token göndermiş gibi bize içerisindeki payloadı getiriyor.
     * bu userId daha sonrasında req içerisine yerleştiriliyor. Ve aşarıdaki test işlemi gerçekleştiriliyor.
     */
    // jwt.verify = function() {
    //   return { userId: "abc" };
    // };
    sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "abc" });
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "abc");
    expect(jwt.verify.called).to.be.true; //verify metodunun çağrılıp çağrılmadığını test eder. Bu testde yukarıdaki authMiddleware de çağrılmıştı. O yüzde bu test geçicektir.
    jwt.verify.restore(); //Test bittikten sonra verify metodu orjinal haline dönüşüyor.
  });

  /**
   * Yukarıda verify metodunu override ettiğim için aşağıdaki test hata verecektir. Bu durumu önlemek için 3. bir kütüphane kullanırız.
   * (sinon)
   */
  it("should throw an error if the token cannot be verified", function() {
    const req = {
      get: function() {
        return "Bearer token";
      }
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
});
