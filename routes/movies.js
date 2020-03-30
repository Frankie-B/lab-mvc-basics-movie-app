const express = require('express');
const app = express();
const Movie = require('../models/movieModel');

// Displaying ALL the movies from the database
app.get('/movies', (req, res) => {
  Movie.find({}).then(moviesData => {
    res.render('movies', { moviesHbs: moviesData });
  });
});

// Displaying the details for a single movie from the database
app.get('/movies/:movieId', (req, res) => {
  Movie.findById(req.params.movieId)
    .then(moviesData => {
      res.render('movie', { movieHbs: moviesData });
    })
    .catch(error => {
      console.log('Could not get movie information: ', error);
    });
});

app.get('/movie/search/', (req, res) => {
  res.render('searchMovie');
});

app.post('/movies/search/movie', (req, res) => {
  Movie.find({ title: req.body.title })
    .then(moviesData => {
      res.render('movies', { moviesHbs: moviesData });
    })
    .catch(error => {
      console.log('Unable to find movie', error);
    });
});

// creating new movie entries.
app.get('/movie/create', (req, res) => {
  res.render('createMovie');
});

app.post('/movie/create', (req, res) => {
  Movie.create({
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    duration: req.body.duration,
  })
    .then(movie => {
      res.redirect(`/movie/detail/${movie._id}`);
    })
    .catch(error => {
      console.log('Unable to create movie', error);
    });
});

// Updating an exist entry
app.get('/movie/update/:id', (req, res) => {
  Movie.findById(req.params.id)
    .then(movieData => {
      res.render('updateMovie', { movieHbs: movieData });
    })
    .catch(err => {
      console.log('Movie not updated', err);
    });
});

app.post('/movie/update/:id', (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    duration: req.body.duration,
  })
    .then(movie => {
      res.redirect(`/movie/update/${movie._id}`); //check movies.hbs the link to the edit movie page is correct
    })
    .catch(err => {
      console.log('Could not update movie!', err);
    });
});

//deleting movie entries
app.get('/movie/delete/:id', (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(movie => {
      res.redirect('/movies');
    })
    .catch(error => {
      console.log('Error', error);
    });
});

module.exports = app;
