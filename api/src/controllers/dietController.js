const { Recipe, Diet } = require('../db.js'); //traigo las db
const axios = require('axios'); //traigo axios

let listOfDiets = [
	{
		name: 'Gluten Free',
	},
	{
		name: 'Ketogenic',
	},
	{
		name: 'Vegetarian',
	},
	{
		name: 'Lacto-Vegetarian',
	},
	{
		name: 'Ovo-Vegetarian',
	},
	{
		name: 'Vegan',
	},
	{
		name: 'Pescetarian',
	},
	{
		name: 'Paleo',
	},
	{
		name: 'Primal',
	},
	{
		name: 'Whole 30',
	},
];


async function getDiets(req, res, next) {
    Diet.findAll() //chequeo en la db si hay dietas guardadas
		.then((response) => { //devuelve una promesa, el findAll a su vez devuelve un array
			if (response.length>0) { //como es un array reviso la longitud 
				return res.json(response).status(200); //si hay algo en la db lo muestro
			} else {
				Diet.bulkCreate(listOfDiets) //si en la db no hay nada muestro la lista de todos los tipos de dieta
					.then((response) => {
						return res.json(response);
					})
					.catch((error) => next(error));
			}
		})
		.catch((error) => next(error));
}

module.exports = {
	getDiets,
};    
