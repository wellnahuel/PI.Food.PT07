const { Recipe, Diet } = require('../db.js');
const axios = require('axios');
const { API_KEY } = process.env

function getRecipes(req, res, next) {
	const ingredient = req.query.name;
	var apiRecipes = [];
	var dbRecipes = [];
	if (ingredient) {
		axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&query=${ingredient}&number=100`)
			.then((apiResponse) => {
				let dataNormalize = apiResponse.data.results.map(r => {
					return {
					name: r.title,
					id: r.id,
					image: r.image,
					//dishTypes: r.dishTypes,
					diets: r.diets,
					resume: r.summary,
					score: r.healthScore,
					instructions: r.instructions,
					}
				})

				apiRecipes = dataNormalize.filter((recipe) => {
					return recipe.name.toLowerCase().includes(ingredient);
				});
				return Recipe.findAll({ include: [Diet] });
			})
			.then((dbResponse) => {
				dbRecipes = dbResponse.filter((recipe) => {
					return recipe.name.toLowerCase().includes(ingredient);
				});
				return res.json(
					[...dbRecipes, ...apiRecipes]
				);
			})
			.catch((err) => next(err));
	} else {
		axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
			.then((apiResponse) => {
				let dataNormalize = apiResponse.data.results.map(r => {
					return {
					name: r.title,
					id: r.id,
					image: r.image,
					//dishTypes: r.dishTypes,
					diets: r.diets,
					resume: r.summary,
					score: r.healthScore,
					instructions: r.instructions,
					}
				})
				apiRecipes = dataNormalize;
				return Recipe.findAll({ include: [Diet] });
			})
			.then((dbResponse) => {
				return res.json([...dbResponse, ...apiRecipes]);
							})
			.catch((error) => next(error));
		} 

}




function getRecipeById(req, res, next) {
	const id = req.params.idRecipe;
	if (id.includes('-')) { //si el id tiene un '-' es porque es UUID , ergo esta en la DB, magia de Lau 
		Recipe.findOne({where: {id:id}, include: { 
			model: Diet,
			attributes: ["name", "id"],
			through: { attributes: [] },
		
		}}).then((resp) => {
			console.log('console de resp',resp)
			return res.json(resp);
		})
		.catch((error) =>{
			next(error);				
		});
	} else {
		axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`)
		  .then((response) => {
				return res.json({
					name: response.data.title,
					id: response.data.id,
					image: response.data.image,
					//dishTypes: response.data.dishTypes,
					diets: response.data.diets,
					resume: response.data.summary,
					//score: response.data.spoonacularScore,
					score: response.data.healthScore,
					instructions: response.data.analyzedInstructions[0],
				});
			})
			.catch((error) =>{
				next(error);				
				} 
			)
		}
	}

function createRecipe(req, res, next) {
	const { title, resume, image, score, instructions, diets } = req.body;
	Recipe.create({        
		name:title,
		image:'https://spoonacular.com/application/frontend/images/articles/what-is-the-best-recipe-search-engine-in-the-world.png',
		resume,
		score: parseFloat(score),
		instructions,
				        
	})
		.then((recipeCreated) => {
			//console.log(diets)
			return recipeCreated.setDiets(diets) ;
		})
		.then(newRecipe => {
			return res.json({
				message: 'Recipe created',
			});
		})
		
		.catch((err) => {

			//console.log(err, 'sot el err'),
			next(err)
		})
}

module.exports = {
	getRecipes,
	getRecipeById,
	createRecipe,
};