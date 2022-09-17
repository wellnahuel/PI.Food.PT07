const { Router } = require('express');
const { getRecipes, getRecipeById, createRecipe }  = require('../controllers/recipeController.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', getRecipes);
router.get('/:idRecipe', getRecipeById);
router.post('/', createRecipe); 

module.exports = router;


