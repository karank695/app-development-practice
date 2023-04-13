const express = require('express');
const passport = require('passport');
const router = express.Router();
const postController = require('../controllers/postController');
router.post('/createPost',passport.checkAuthentication, postController.createPost);
module.exports = router;
