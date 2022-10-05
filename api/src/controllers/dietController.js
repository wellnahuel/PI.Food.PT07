const { Recipe, Diet } = require('../db.js');
const axios = require('axios');
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
	Diet.findAll() 
		.then((response) => { 
			if (!response.length) { 
				Diet.bulkCreate(listOfDiets) 
					.then((response) => {
						return response;
					})
					.catch(error => console.log(error)); 
			} else {
				return response;
			}
		})
		.catch(error => console.log(error));
}

function getDiets(req, res) {
	Diet.findAll() 
		.then((response) => {
			return res.send(response)
		})
}

module.exports = {
	getDiets,
	fillDiets,
};    
