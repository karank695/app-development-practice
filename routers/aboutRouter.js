const express = require('express');
const router = express.Router();
const abdController=require('../controllers/abdController')
const aboutController = require('../controllers/aboutController');
const passport = require('passport');
router.get('/about',passport.checkAuthentication, aboutController.about).get('/about/desc', abdController.abd);
module.exports = router;