const User = require('../models/user');
//signup page rendering
module.exports.signup = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/about');
    }
    res.render('signup', {
        title: "sign_up"
    });
}
//rendering signin page
module.exports.signin = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/about');
    }
    res.render('signin', {
        title: 'sign_in'
    });
}
//creating user after signup
module.exports.createUser = (req, res) => {
    if (req.body.password != req.body.confirm_password) {
        console.log('password not matched');
        return res.send('password not matched');
    }
    User.find({
        email: req.body.email
    }).then((user) => {
        if (user.length > 0) {
            console.log(user);
            return res.redirect('/signin');

        } else {
            // res.send('user created');
            console.log(req.body);
            User.create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            }).then((data) => {
                console.log(data);
                return res.render('signin', {
                    title: "session-creation"
                });
            }).catch((err) => {
                console.log(err);
            });


        }
    }).catch((err) => {
        console.log(err);
    })
}

//authenticating user
module.exports.createSession = (req, res) => {
    return res.redirect('/about');
}
module.exports.signout = (req, res) => {
    res.clearCookie('codial');
    res.redirect('/signup');
}