const authMiddleware = require("../middleware/is-auth");
const expect = require("chai").expect;

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
});
