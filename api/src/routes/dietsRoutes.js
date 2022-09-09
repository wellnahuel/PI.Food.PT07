const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const { getDiets } = require('../controllers/dietController.js')

router.get('/diets', getDiets)


module.exports = router;
