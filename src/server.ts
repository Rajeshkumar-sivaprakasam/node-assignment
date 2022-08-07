const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.router');

require('./db/mongoose.ts');

dotenv.config(); //dotenv configed
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // allowing express app to send json
app.use(express.urlencoded({ extended: true })); //express defaulting haivng this bodyparser things to handle post req

// Home Route
app.get('/', (req, res) => {
  res.send('Hello Node!');
});

//other routes
app.use('/user', userRouter);

//making app awake
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
