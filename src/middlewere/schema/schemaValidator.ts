const constant = require('../../helpers/constant');

const validation = (schema) => async (req, res, next) => {
  const body = req.body;

  await schema
    .validate(body)
    .then(() => {
      next(); //move to next params in user.router if it passed
    })
    .catch((err) => {
      res.status(400).json({ Error: constant.BAD_REQ });
    });
};

module.exports = validation;
