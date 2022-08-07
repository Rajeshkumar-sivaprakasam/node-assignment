const express = require('express');
const userController = require('../controller/user.controller');
const router = express.Router();
const userValidator = require('../validationSchema/user.validation');
const validate = require('../middlewere/schema/schemaValidator');

router.post('/register', validate(userValidator), userController.create);

module.exports = router;
export {};
