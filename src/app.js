const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const partialsDirPath = path.join(__dirname, '../templates/partials');

const app = express();

app.use(express.static(publicDirPath));

app.set('view engine', 'hbs');
app.set('views', viewsDirPath);

hbs.registerPartials(partialsDirPath);

app.get('', (req, res) => {
  res.render('index', { title: 'Weather', author: 'Hao' });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({ error: 'No address provided.' });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, { forecast }) => {
      if (error) {
        return res.send({ error });
      }

      res.send({ address, location, forecast });
    });
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', author: 'Xinyue' });
});

app.get('/about/*', (req, res) => {
  res.render('404', { title: '404', author: 'April', errorMessage: '404 for about.' });
});

app.get('*', (req, res) => {
  res.render('404', { title: '404', author: 'April', errorMessage: 'General 404.' });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
