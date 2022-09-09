const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dietsRoute = require('./dietsRoutes')
const recipesRoute = require('./recipesRoutes')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/diets', dietsRoutes)
router.use('/recipes', recipesRoutes)




module.exports = router;









