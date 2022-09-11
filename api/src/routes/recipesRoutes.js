const { Router } = require('express');
const { getRecipesByName, getRecipeById, createRecipe }  = require('../controllers/recipeController.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', getRecipesByName);
router.get('/recipes/:idRecipe', getRecipeById);
router.post('/recipes', createRecipe); 




module.exports = router;


