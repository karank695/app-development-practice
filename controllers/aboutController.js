const User = require('../models/user');
module.exports.about = (req, res) => {
    res.render('about',{title:"about"});
}