const { Router } = require('express');
const {  getDiets,   fillDiets } = require('../controllers/dietController.js')

const router = Router();

router.get('/', getDiets)

module.exports = router;
