const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
   //Iteration 2
    return Recipe.create({title: "Carbonara",
    level: "Easy Peasy",
    ingredients: ["eggs", "bacon", "cheese", "pasta"],
    cuisine: "Italian",
    dishType: "main_course",
    duration: 20,
    creator: "Nicolo"});
  })
  .then((createdRecipe) => {
    console.log('Created Recipe: ' + createdRecipe.title);
    //Iteration 3
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    console.log('Inserted Recipes:');
    recipes.forEach((recipe) => console.log(recipe.title));
    //Iteration 4
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100});
  })
  .then((updatedRecipe) => {
    console.log('Updated Recipe: ' + updatedRecipe.title);
    //Iteration 5
    return Recipe.deleteOne({title:"Carrot Cake"});
  })
  .then((removedRecipe)=>{
    console.log('Removed Recipe:' + removedRecipe.title);
    
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  // Iteration 6
  .finally(mongoose.connection.close());
