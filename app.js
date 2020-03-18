const express = require('express');
const app = express();
const mongoose = require('mongoose');
const hbs = require('hbs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect('mongodb://localhost/recipes-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(error => {
    console.log('Unexpected error connection failed! :', error);
  });

app.set('PORT', 3000);
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static('public'));

// app.use('/', require('./routes/index'));
// app.use('/', require('./routes/recipes'));

// app.listen(app.get('PORT'), () => {
//   console.log('listening on port', app.get('PORT'));
// });
