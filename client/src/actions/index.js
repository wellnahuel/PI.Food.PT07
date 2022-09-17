import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME';
export const GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID';
export const GET_DIETS = 'GET_DIETS';

const URL_LOCAL = 'http://localhost:3001';

   export function fetchRecipes() {
    return function(dispatch) {
        axios.get(`${URL_LOCAL}/recipes`)
        .then((recipes) => { //pido las recetas a mi backend 
            dispatch({
                type: GET_RECIPES, //dispacho ESTO
                payload: recipes.data //le puse el .data para sacarselo al reducer
            })
        })
        .catch((err) => { //
            console.log(err)
        })
    }
} 



