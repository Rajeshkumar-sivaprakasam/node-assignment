const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.router');
const hbs = require('hbs');
const morgan = require('morgan');

require('./db/mongoose.ts');

dotenv.config(); //dotenv configed
const app = express();
const pathFile = path.join(__dirname, './server.ts');
const viewPath = path.join(__dirname, '../src/templates/views');
const partialPath = path.join(__dirname, '../src/templates/partials');
const port = process.env.PORT || 3000;

// View Engine Setup
app.set('views', path.join(__dirname));
app.set('view engine', 'hbs');

app.use(express.json()); // allowing express app to send json
app.use(express.urlencoded({ extended: true })); //express defaulting haivng this bodyparser things to handle post req
//morgon combined
app.use(morgan(':method :status :url "HTTP/:http-version"'));

app.set('view engine', 'hbs'); //hbs setup //Dynamic web pages
app.set('views', viewPath); //view path
hbs.registerPartials(partialPath); //partials path

// Home Route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'This is the home page for node CURD',
    author: 'Rajesh',
  });
});

//about
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    author: 'Mahesh',
  });
});

//help
app.get('/help', (req, res) => {
  res.render('about', {
    title: 'Help Page',
    author: 'Jay',
  });
});

//other routes
app.use('/user', userRouter);

//making app awake
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
