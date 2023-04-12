const Post = require('../models/post');
module.exports.createPost = (req, res) => {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(() => {
        res.redirect('back');
    }).catch((err) => {
        console.log(err);
    });
    
}