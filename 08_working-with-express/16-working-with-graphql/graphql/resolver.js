const bcrypt = require("bcryptjs");

const User = require("../models/user");

module.exports = {
  createUser: async function({ userInput }, req) {
    //   const email = args.userInput.email;
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error("User exist already!");
      throw error;
    }

    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw
    });

    const createdUser = await user.save();
    /**
     * _docs sadece user'ı döndürür, mongoose un sağladığı metotlar veya başka şeyler olmadan
     */
    return {
      ...createdUser._docs,
      _id: createdUser._id.toString()
    };
  }
};

// module.exports = {
//   hello() {
//     return {
//       text: "Hello World",
//       views: 1245
//     };
//   }
// };
