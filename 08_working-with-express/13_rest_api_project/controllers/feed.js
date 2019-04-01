const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator/check");

const io = require("../socket");
const Post = require("../models/post");
const User = require("../models/user");
/**
 * async arka planda tine then catch mekanızmasını kullanır.
 */
exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .populate("creator")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({
      message: "Fetched posts successfully",
      posts: posts,
      totalItems: totalItems
    });
  } catch (err) {
    next(err);
  }

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
  let creator;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: req.userId
  });
  post
    .save()
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      creator = user;
      user.posts.push(post);
      return user.save();
    })
    .then(result => {
      /**
       * Emit tüm bağli kullanıcılara bir mesaj gönderecektir.
       * broadcast kendisi hariç tüm kullanıcılara gönderir.
       */
      /**
       * _doc ile post içerisindeki tüm proplar getirilir. daha sonrasında bu proplara ek olarak creator ekledik;
       */

      /**
        * post._doc log çıktısı
          { 
            _id: 5ca27f5f52a29517a272fa77,
            title: 'asdfasdfasdf',
            content: 'afasdfasdfasdfadsf',
            imageUrl: 'images/2019-04-01T21:15:11.247Z-book.jpg',
            creator: 5ca25b08166b0a742b3e6d09,
            createdAt: 2019-04-01T21:15:11.266Z,
            updatedAt: 2019-04-01T21:15:11.266Z,
            __v: 0 
          }
        */
      io.getIO().emit("posts", {
        action: "create",
        post: { ...post._doc, creator: { _id: req.userId, name: creator.name } }
      });
      //Create post in db
      res.status(201).json({
        message: "Post created successfuly",
        post: post,
        creator: { _id: creator._id, name: creator.name }
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
    .populate("creator")
    .then(post => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      if (post.creator._id.toString() !== req.userId) {
        const error = new Error("Not authorized");
        error.statusCode = 403;
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
      io.getIO().emit("posts", { action: "update", post: result });
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
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not authorized");
        error.statusCode = 403;
        throw error;
      }
      //Check login user
      clearImage(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      user.posts.pull(postId);
      return user.save();
    })
    .then(result => {
      io.getIO().emit("posts", { action: "delete", post: postId });
      res.status(200).json({ message: "Deleted post." });
    })
    .catch(err => next(err));
};

const clearImage = filePath => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, err => console.log(err));
};
