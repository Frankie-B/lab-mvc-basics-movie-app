const express = require('express');
const app = express();
const Recipe = require('../models/recipe');

app.get('/recipes', (req, res) => {
  Recipe.find({})
    .then(recipesData => {
      res.render('recipes', { recipesHbs: recipesData });
    })
    .catch(err => {
      res.send('error');
    });
});

app.get('/recipes/:recipeId', (req, res) => {
  Recipe.findById(req.params.recipeId)
    .then(recipeData => {
      res.render('recipes', { recipeHbs: recipeData });
    })
    .catch(err => {
      res.send('error');
    });
});

app.get('/recipes/createRecipe', (req, res) => {
  res.render('createRecipe');
});

app.post('/recipes/createRecipe', (req, res) => {
  Recipe.create({
    title: req.body.title,
    dishType: req.body.dishType,
    duration: req.body.duration,
    creator: req.body.creator,
  })
    .then(recipe => {
      res.redirect(`/recipes/allRecipes/${recipe._id}`);
    })
    .catch(err => {
      res.send('error');
    });
});

app.get('/recipes/delete/:id', (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(recipe => {
      res.redirect('recipes');
    })
    .catch(err => {
      console.log('Err', err);
    });
});
app.get('/recipes/updateRecipe/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipeData => {
      res.render('updateRecipe', { recipeHbs: recipeData });
    })
    .catch(err => {
      res.send('Error');
    });
});

app.post('/recipes/updateRecipe/:id', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    director: req.body.cuisine,
    year: req.body.duration,
    duration: req.body.creator,
  })
    .then(recipe => {
      res.redirect(`/recipe/allRecipes/${recipe._id}`);
    })
    .catch(err => {
      res.send('err');
    });
});

module.exports = app;
