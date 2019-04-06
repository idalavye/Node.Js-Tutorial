const { buildSchema } = require("graphql");

/**
 * String! ünlem işareti String olmasını zorunlu kılıyor. Öteki durumda hata verecek.
 */
module.exports = buildSchema(`
    type TestData {
        text: String!
        views: Int!
    }

    type RootQuery { 
        hello: TestData
    }

    schema {
        query: RootQuery
    }
`);

/**
 * clientden localhost:8080/graphql adresine istek attığımız zaman graphql tetiklenecek.
 * 
    {
	"query":"{ hello { text views } }"
    } 

    Client den yukarıdaki gibi bir body geldiği zaman 
    {
        "data": {
        "hello": {
            "text": "Hello World",
            "views": 1245
            }
        }
    }

    şeklinde bir cevap deönecek.
    Burada önemli olan şey ayrıştırma işlemi client tarafında değil server tarafnda olmaktaadır. Client sadece text i istemiş olsaydı
    {
	"query":"{ hello { text } }"
    } 
    kullanması yeterliydi.
 */
