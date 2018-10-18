const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

//set hbs as view engine 
app.set('view engine', 'hbs');

// change file extension for templates
app.engine('html', require('hbs').__express);

// register partials folder
hbs.registerPartials(__dirname + '/views/partials');

// register hbs helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('uppercase', (text) => {
  return text.toUppercase();
})

//setting root directory using express middleware
// app.use is registering middleware
// needs to be moved under other middlewares as it is important where it resides lexically
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => [
  res.render('home.html', {
    pageTitle: 'Home page'
  })
])

app.get('/about', (req, res) => [
  res.render('about.html', {
    pageTitle: 'About page'
  })
])

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});