const Post = require('../models/post');
module.exports.home = (req, res) => {
    // console.log(req.cookies);
    // res.cookie('mycookie', 12);
    
 
    // Post.find().then((data) => {
    //     return res.render('home', { title: 'home', posts: data })
    // }).catch((err) => {
    //     console.log(err);
    // });
    Post.find().populate('user').then((data) => {
        console.log(data);
        return res.render('home', { title: 'home',posts:data });
    }).catch((err) => {
        console.log(err);
    });
    

    
}