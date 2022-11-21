import axios from 'axios';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME';
export const GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID';
export const GET_DIETS = 'GET_DIETS';
export const ORDER_AZ = 'ORDER_AZ';
export const ORDER_ZA = 'ORDER_ZA';
export const ORDER_HEALTH_DOWN = 'ORDER_HEALTH_DOWN';
export const ORDER_HEALTH_UP = 'ORDER_HEALTH_UP';
export const SORT = 'SORT';
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS';
export const ORDER = 'ORDER';

const URL_LOCAL = 'https://pi-food-dqzf.onrender.com';

export function fetchRecipes() {
  return function (dispatch) {
    axios.get(`${URL_LOCAL}/recipes`)
      .then((recipes) => { 
        dispatch({
          type: GET_RECIPES, 
          payload: recipes.data
        })
      })
      .catch((err) => {
      })
  }
}



export function searchRecipes(search) {
  return function (dispatch) {
    axios.get(`${URL_LOCAL}/recipes?name=${search}`) 
      .then((recipes) => { 
        dispatch({
          type: GET_RECIPES_BY_NAME, 
          payload: recipes.data 
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export function sort(order) {
  return {
    type: SORT,
    payload: order
  }
}

export function getDiets() {
  return (dispatch) => {
    axios.get(`${URL_LOCAL}/diets`)
      .then((diets) => {
        dispatch({ type: GET_DIETS, payload: diets.data });
      });
  };
}

export function filterRecipesByDiets(payload) {

  return {
    type: FILTER_BY_DIETS,
    payload
  }
}

export function postRecipe(payload) {
  return async function () {
    const response = await axios.post(`${URL_LOCAL}/recipes`, payload);
    return response;
  }
}

export function order(order) {
  return {
    type: ORDER,
    payload: order
  }
}





































