const { Recipe, Diet } = require('../db.js');
const axios = require('axios');
const { Op } = require('sequelize');
import { BASE_URL, BASE_NEXT, RECIPE_DETAIL, GET_RECIPE_INFO } from '../../constants.js'
const { API_KEY } = process.env
//BASE_URL= 'https://api.spoonacular.com/recipes';
//BASE_NEXT= '/complexSearch';
//RECIPE_DETAIL= '&addRecipeInformation=true';
//GET_RECIPE_INFO = '{id}/information';
//formato ==>  https://api.spoonacular.com/recipes/complexSearch?apiKey=331724e7d8284060a4360d44591cf676&addRecipeInformation=true&query=apple&number=15
// url base 
/* function getRecipes(req, res, next) { 

}
 */

//el nombre viene por query!
function getRecipesByName(req, res, next) {
    let name = req.query.name;
    if (name) {
        recipePromiseApi = axios.get(`
            ${BASE_URL}${BASE_NEXT}?apiKey=${API_KEY}${RECIPE_DETAIL}&query=${name}&number=100
            `)
        recipePromiseDb = Recipe.findAll({
            include: Diet,
            where: {
                name: {
                    [Op.iLike]: '%' + name + '%'
                }
            }
        })

    }



}

function getRecipeById(req, res, next) {

}

function createRecipe(req, res, next) {

}

module.exports = {
    getRecipesByName,
    getRecipeById,
    createRecipe,
};

