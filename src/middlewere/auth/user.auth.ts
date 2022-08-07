const jwt = require('jsonwebtoken');
const User = require('../../models/user.model.js');
const constant = require('../../helpers/constant');
const dotenv = require('dotenv');

dotenv.config();
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRECT);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      res.status(401).send({ Error: constant.UN_AUTHORIZED });
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ Error: constant.INTERNAL_SERVER_ERROR });
  }
};

module.exports = auth;
export {};
