const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); //dotenv configed

//mongoose connect
mongoose
  .connect(process.env.Mongoose_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB Connected succssfully!');
  })
  .catch((err) => {
    console.log('DB connection failed!');
  });

export {};
