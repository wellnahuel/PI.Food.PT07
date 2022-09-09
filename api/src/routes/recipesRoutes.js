const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const { Recipes, Diets } = require('../db')
//const axios = require('axios')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const { getRecipes, getRecipesByName, getRecipeById, createRecipe } = require('../controllers/recipeController.js');

router.get('/recipes', getRecipes);
router.get('/recipes/:idReceta', getRecipeById);
router.post('/recipe', createRecipe);

module.exports = router;


