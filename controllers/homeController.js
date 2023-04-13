const Post = require('../models/post');
module.exports.home = (req, res) => {
    Post.find().populate('user').then((data) => {
        return res.render('home', { title: 'home',posts:data });
    }).catch((err) => {
        console.log(err);
    });
    

    
}