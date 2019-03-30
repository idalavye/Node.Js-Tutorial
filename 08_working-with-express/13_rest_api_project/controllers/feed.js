exports.getPosts = (req, res, next) => {
    /**
     * json methodu express tarafından sunulmakta
     */
    res.status(200).json({ posts: [{ title: 'First Post', content: 'This is the first post!', imageUrl: 'images/book.jpg' }] });
};

exports.postPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;

    //Create post in db
    res.status(201).json({
        message: 'Post created successfuly',
        post: { id: new Date().toISOString(), title: title, content: content }
    });
};