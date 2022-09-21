const { Recipe, Diet } = require('../db.js');
const axios = require('axios');
const { API_KEY } = process.env
const { URL_SPOONACULAR } = 'https://api.spoonacular.com/recipes/'

const hardcoreDataApi = require('./100recipes.json');


function getRecipes(req, res, next) {
	const ingredient = req.query.name;
	var apiRecipes = [];
	var dbRecipes = [];
	return res.json(hardcoreDataApi.results)
	/* if (ingredient) {
		axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&query=${ingredient}&number=100`)
			.then((apiResponse) => {
				apiRecipes = apiResponse.data.results.filter((recipe) => {
					return recipe.title.toLowerCase().includes(ingredient);
				});
				return Recipe.findAll({ include: [Diet] });
			})
			.then((dbResponse) => {
				dbRecipes = dbResponse.filter((recipe) => {
					return recipe.title.toLowerCase().includes(ingredient);
				});
				return res.json(
					[...dbRecipes, ...apiRecipes].slice(0, 9)
				);
			})
			.catch((err) => next(err));
	} else {
		axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=25`)
			.then((apiResponse) => {
				apiRecipes = apiResponse.data.results;
				return Recipe.findAll({ include: [Diet] });
			})
			.then((dbResponse) => {
				return res.json([...dbResponse, ...apiRecipes]);
			})
			.catch((error) => next(error));
	} */

}




function getRecipeById(req, res, next) {
	const id = req.params.idRecipe;
	if (id.includes('-')) { //si el id tiene un '-' es porque es UUID , ergo esta en la DB, magia de Lau 
		Recipe.findByPk(id, { include: Diet }).then((resp) => {
			return res.json(resp);
		});
	} else { // si no esta en la DB me voy a buscar a la API (aca use tu magia Fran)
		axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`)
		  .then((response) => {
				return res.json({
					title: response.data.title,
					image: response.data.image,
					dishTypes: response.data.dishTypes,
					diets: response.data.diets,
					summary: response.data.summary,
					score: response.data.spoonacularScore,
					healthScore: response.data.healthScore,
					instructions: response.data.instructions,
				});
			})
			.catch((error) => next(error));
	}
}


function createRecipe(req, res, next) {
	const { /* name, */ title, summary, image, score, healthScore, instructions, diets, /* resume */ } = req.body;
	Recipe.create({
        //name,
		title,
		image,
		summary,
		score: parseFloat(score),
		healthScore: parseFloat(healthScore),
		instructions,
        //resume
	})
		.then((recipeCreated) => {
			return recipeCreated.setDiets(diets);
		})
		.then(newRecipe => {
			return res.json({
				message: 'Recipe created',
			});
		})
		.catch((err) => next(err));
}

module.exports = {
	getRecipes,
	getRecipeById,
	createRecipe,
};