const { Router } = require('express');

const dietsRoutes = require('./dietsRoutes')
const recipesRoutes = require('./recipesRoutes')
const router = Router();

router.use('/diets', dietsRoutes)
router.use('/recipes', recipesRoutes)

module.exports = router;









