const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
//authenticating using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function (email, password, done) {
        //identifying the user and establish identity
        User.findOne({
            email: email
        }).then((user) => {
            if (!user || user.password != password) {
                console.log('Invalid Username/password');
                return done(null, false);
            }
            return done(null, user);
        }).catch((err) => {
            console.log("error in finding user+++passport");
            return done(err);
        });
    }
));
//serializing the user to decide which key is to be in the cookie
passport.serializeUser(function (user, done) {
    done(null, user.id);
})
//deserializing the user form the key in the cookies
// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         if (err) {
//             console.log("error in finding user==>passport");
//             return done(err);
//         }
//         return done(null, user);
//     });
// });
passport.deserializeUser(function (id, done) {
    User.findById(id).then((user) => {
        return done(null, user);
    }).catch((err) => {
        console.log("error in finding user==>passport");
        return done(err);
    });
})

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    //if the user is signed in ,then pass on the req to next function (controller actions)
    if (req.isAuthenticated()) {
                console.log('deseria');
        console.log(req.user);
        console.log('deseria');
        return next();
    }
    return res.redirect('/signin');
}
passport.setAuthenticatedUser = function (req, res, next) {
    //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        
    }
    next();
    
}

module.exports = passport;