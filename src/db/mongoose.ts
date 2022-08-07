const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); //dotenv configed
const MongooseURI = process.env.MongooseURI;

//mongoose connect
mongoose
  .connect(MongooseURI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB Connected succssfully!');
  })
  .catch((err) => {
    console.log('DB connection failed!');
  });

export {};
