const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dietsRoutes = require('./dietsRoutes')
const recipesRoutes = require('./recipesRoutes')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/diets', dietsRoutes)
router.use('/recipes', recipesRoutes)
router.use('/diets', dietsRoutes)

module.exports = router;









