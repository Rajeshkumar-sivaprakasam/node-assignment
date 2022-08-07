const express = require('express');
const userController = require('../controller/user.controller');
const router = express.Router();
const userValidator = require('../validationSchema/user.validation');
const validate = require('../middlewere/schema/schemaValidator');
const auth = require('../middlewere/auth/user.auth');

//create user
router.post('/register', validate(userValidator), userController.create);

//login
router.post('/login', userController.login);

//update
router.put('/update', auth, userController.update);

module.exports = router;
export {};
