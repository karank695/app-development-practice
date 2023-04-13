const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');
router.get('/signup', userController.signup);
router.get('/about', passport.checkAuthentication, userController.about);
router.post('/createUser', userController.createUser);
router.get('/signin', userController.signin);
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/signin' }
),userController.createSession);
router.get('/sign-out', userController.signout);

module.exports = router;