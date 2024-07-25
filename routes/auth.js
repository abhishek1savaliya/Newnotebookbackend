const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const user = require('../controller.js/auth.controller');

router.post('/checkusername', user.checkUsername);

router.post('/createuser', user.createUser);

router.post('/login', user.login);

router.get('/getuser', fetchuser, user.getUser);

module.exports = router;
