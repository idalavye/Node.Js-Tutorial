const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator/check");

const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      res
        .status(200)
        .json({ message: "Fetched posts successfully", posts: posts });
    })
    .catch(err => next(err));
  /**
   * json methodu express tarafından sunulmakta
   */
  //   res.status(200).json({
  //     posts: [
  //       {
  //         _id: "1",
  //         title: "First Post",
  //         content: "This is the first post!",
  //         imageUrl: "images/book.jpg",
  //         creator: {
  //           name: "İbrahim"
  //         },
  //         createdAt: new Date()
  //       }
  //     ]
  //   });
};

exports.postPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
    // return res.status(422).json({
    //   message: "Validation failed, entered data is incorrect",
    //   errors: errors.array()
    // });
  }

  if (!req.file) {
    const error = new Error("No image provided");
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path;
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: { name: "İbrahim" }
  });
  post
    .save()
    .then(result => {
      //Create post in db
      res.status(201).json({
        message: "Post created successfuly",
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      /**
       * async bir code içerisinde throw kullanırsak express error handler ile
       * bunu yakalamayız. Bunun için next içerisinde kullanıyoruz.
       */
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error("Could not found post");
        error.statusCode = 404;
        /**
         * catch bu hatayı yakalayacak ve express handler bu hatayayı yakalıyacak
         */
        throw error;
      }
      res.status(200).json({ message: "Post fetched", post: post });
    })
    .catch(err => next(err));
};

exports.updatePost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error("No File picked");
    error.statusCode = 422;
    throw error;
  }

  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      return post.save();
    })
    .then(result => {
      res.status(200).json({ message: "Post updated", post: result });
    })
    .catch(errors => next(errors));
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error("Could not found post");
        error.statusCode = 404;
        throw error;
      }
      //Check login user
      clearImage(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: "Deleted post." });
    })
    .catch(err => next(err));
};

const clearImage = filePath => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, err => console.log(err));
};
