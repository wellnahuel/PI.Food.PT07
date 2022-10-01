const { Router } = require('express');
const { getRecipes, getRecipeById, createRecipe }  = require('../controllers/recipeController.js');
const router = Router();

router.get('/', getRecipes);
router.get('/:idRecipe', getRecipeById);
router.post('/', createRecipe); 

module.exports = router;


