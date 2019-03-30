const { validationResult } = require("express-validator/check");

const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  /**
   * json methodu express tarafından sunulmakta
   */
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "First Post",
        content: "This is the first post!",
        imageUrl: "images/book.jpg",
        creator: {
          name: "İbrahim"
        },
        createdAt: new Date()
      }
    ]
  });
};

exports.postPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed, entered data is incorrect",
      errors: errors.array()
    });
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: "images/book.jpg",
    creator: { name: "İbrahim" }
  });
  post
    .save()
    .then(res => {
      //Create post in db
      res.status(201).json({
        message: "Post created successfuly",
        post: res
      });
    })
    .catch(err => console.log(err));
};
