const UserModel = require('../models/user.model');
const constant = require('../helpers/constant');

// Create and Save a new Note
exports.create = async (req, res) => {
  if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.password) {
    res.status(400).send({ error: constant.BAD_REQ });
  }

  const user = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    addressLine1: req.body.addressLine1,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
  });
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(500).send({ Error: constant.INTERNAL_SERVER_ERROR });
  }
};

exports.login = async (req, res) => {
  try {
    //finding user by cred
    const user = await UserModel.findUserByCredentials(req.body.email, req.body.password);
    //getting token
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(500).send({ Error: constant.INTERNAL_SERVER_ERROR });
  }
};
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {};

// Find a single note with a noteId
exports.findOne = (req, res) => {};

// Update a note identified by the noteId in the request
exports.update = async (req, res, next) => {
  const { addressLine1, city, state, zip } = req.body;
  if (!addressLine1 || !city || !state || !zip) {
    res.status(400).send(constant.BAD_REQ);
    next();
    return;
  }
  const data = { addressLine1, city, state, zip };
  const email = req.user.email;
  try {
    const updatedUser = await UserModel.findOneAndUpdate(email, data, { new: true });
    if (updatedUser) {
      res.status(200).send({ success: true, user: updatedUser });
    }
  } catch (e) {
    res.status(500).send({ Error: constant.INTERNAL_SERVER_ERROR });
  }
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {};
export {};
