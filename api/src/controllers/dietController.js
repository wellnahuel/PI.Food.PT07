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


function fillDiets() {
	console.log('hola entre a filldiets')
    Diet.findAll() //chequeo en la db si hay dietas guardadas
		.then((response) => { //devuelve una promesa, el findAll a su vez devuelve un array
			if (!response.length) { //como es un array reviso la longitud 
				Diet.bulkCreate(listOfDiets) //si en la db no hay nada muestro la lista de todos los tipos de dieta
					.then((response) => {
						console.log(response)

						return response;
					})
					.catch(error => console.log(error)); //si hay algo en la db lo muestro
			} else {
				console.log(response)
				return response;
				
			}
		})
		.catch(error => console.log(error));
}

function getDiets(req, res) {
	console.log('hola entre agetdiets')
	Diet.findAll() //chequeo en la db si hay dietas guardadas
	.then((response) => {
		return res.send(response)
	})
}

module.exports = {
	getDiets,
	fillDiets,
};    
