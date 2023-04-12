module.exports.home = (req, res) => {
    console.log(req.cookies);
    res.cookie('mycookie', 12);
    return res.render('home', { title:"home"});
}