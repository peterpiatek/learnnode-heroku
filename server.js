const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

const ENV_maintenance = false;

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

// using middleware for log changes storage
app.use((req, res, next) => {
  let now = new Date().toString();
  let logData = `${now}: ${req.method}, ${req.url} \n`; 
  fs.appendFile('server-log', logData, (err) =>{
    if(err) console.log('Unable to update the log file');
  })
  next();
})

// using middleware for maintenance page 
if(ENV_maintenance){
  app.use((req, res) => {
    res.render('maintenance.html', {
      pageTitle: 'Sorry we are updating the website'
    })
  })
}

app.get('/', (req, res) => [
  res.render('home.html', {
    pageTitle: 'Home page'
  })
])

// app.get('projects')

app.get('/about', (req, res) => [
  res.render('about.html', {
    pageTitle: 'About page'
  })
])

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});