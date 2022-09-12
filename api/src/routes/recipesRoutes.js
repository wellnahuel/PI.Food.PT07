const { Router } = require('express');
const { getRecipesByName, getRecipeById, createRecipe }  = require('../controllers/recipeController.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', getRecipesByName);
router.get('/:idRecipe', getRecipeById);
router.post('/', createRecipe); 




module.exports = router;


