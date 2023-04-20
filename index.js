const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const port = process.env.port || 8000;
const db = require('./config/connection');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const User = require('./models/user');
const flash = require('connect-flash');
//middleware for parsing body
app.use(express.urlencoded({ extended: true }));
//middleware for cookieParser
app.use(cookieParser());
//middleware for layouts
app.use(expressEjsLayouts);
//midleware for serving static files
app.use(express.static('src'));

//setting view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codial',
    //Todo change the secret before deployment
    secret: 'balhsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
    ,
      store: MongoStore.create({
          mongoUrl: 'mongodb://localhost/users_db',
          autoRemove: 'disabled' // Default
      })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(passport.setAuthenticatedUser);
//different router for accepting request
// app.use('/', require('./routers/homeRouter'));
app.use('/', require('./routers/userRouter'));
// app.use('/', require('./routers/postRouter'));
app.listen(8000, () => {
    console.log(`I am listening at port ${port}`);
})