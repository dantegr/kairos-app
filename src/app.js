const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const darksky = require('./utils/darksky');

const app = express();
const port = process.env.PORT || 3000;

//Define Paths for express
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath =path.join(__dirname,'../templates/partials');

//Setup handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicDirectoryPath));

app.get('',(req, res) => {
  res.render('index',{
    title: 'Forecaster',
    name: 'Pantelis Tamtakos'
  });
});

app.get('/about',(req, res) => {
  res.render('about', {
    title: 'About me',
    name:'Pantelis Tamtakos'
  });
});

app.get('/help',(req, res) => {
  res.render('help', {
    message: 'You need some help',
    title: 'Help',
    name: 'Pantelis Tamtakos'
  });
});

app.get('/weather',(req, res) => {
  if (!req.query.address) {
    return res.send({
      error:'Address must be provided'
    });
  }
    geocode( req.query.address, (error,{ latitude, longtitude, location } = {}) => {
      if(error) {
        return res.send({
          error:'Invalid location'
        });
      }
      darksky(latitude, longtitude, (error,darkskyData) => {
        if(error) {
          return res.send({
            error:'Invalid weather data'
          });
        }
        res.send({
          forecast:darkskyData,
          location,
          address: req.query.address
        });
      });
    });
});

app.get('/products',(req,res) => {
  if (!req.query.search) {
    return res.send({
      error:'You must provide a search term'
    });
  }
  console.log(req.query.search);
  res.send({
    products:[]
  })
});

app.get('/help/*',(req,res) => {
  res.render('404', {
    title: '404 Page',
    error:'Help article not found',
    name: 'Pantelis Tamtakos'
  });
});

app.get('*',(req,res) => {
  res.render('404', {
    title: '404 Page',
    error:'Page not found',
    name: 'Pantelis Tamtakos'
  });
});

app.listen(port, () => {
  console.log('Server is up on port' + port);
});