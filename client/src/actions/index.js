import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME';
export const GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID';
export const GET_DIETS = 'GET_DIETS';
export const ORDER_AZ = 'ORDER_AZ';
export const ORDER_ZA = 'ORDER_ZA';
//export const ORDER_SCORE_UP = 'ORDER_SCORE_UP';
//export const ORDER_SCORE_DOWN = 'ORDER_SCORE_DOWN';
export const ORDER_HEALTH_DOWN = 'ORDER_HEALTH_DOWN';
export const ORDER_HEALTH_UP = 'ORDER_HEALTH_UP';
export const SORT = 'SORT';


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

    export function searchRecipes(search) {
        return function(dispatch) {
            axios.get(`${URL_LOCAL}/recipes?name=${search}`) // QUE PASA ACA¿ CON QUERY=SEARCH NO ANDA, NO DEBERIA PASAR ESTO PORQUE YO LO DEFINI ASI EN EL BACK
            .then((recipes) => { //pido las recetas a mi backend 
                dispatch({
                    type: GET_RECIPES_BY_NAME, //dispacho ESTO
                    payload: recipes.data //le puse el .data para sacarselo al reducer
                })
            })
            .catch((err) => { //
                console.log(err)
            })
        }
    }

    export function getRecipesById(id) {
        return (dispatch) => {
            axios.get(`${URL_LOCAL}/recipes/${id}`)
            .then((response) => {
                dispatch({ type: GET_RECIPE_BY_ID, payload: response.data });
            });
        };
    }

   /*  export function sort(order) {
      return {
          type: SORT,
          payload: order
      }
    } */

    export function orderAZ() {
      return function (dispatch) {
        return dispatch({ type: "ORDER_AZ" });
      };
    }
    
    export function orderZA() {
      return function (dispatch) {
        return dispatch({ type: "ORDER_ZA" });
      };
    }

    export function orderHealthDown() {
      return function (dispatch) {
        return dispatch({ type: "ORDER_HEALTH_DOWN" });
      };
    }
    
    export function orderHealthUp() {
      return function (dispatch) {
        return dispatch({ type: "ORDER_HEALTH_UP" });
      };
    }





































    

    /* export function orderAZ() {
        return function (dispatch) {
          return dispatch({ type: ORDER_AZ });
        };
      }
      
      export function orderZA() {
        return function (dispatch) {
          return dispatch({ type: ORDER_ZA });
        };
      }
      
      export function orderScoreUp() {
        return function (dispatch) {
          return dispatch({ type: ORDER_SCORE_UP });
        };
      }
      
      export function orderScoreDown() {
        return function (dispatch) {
          return dispatch({ type: ORDER_SCORE_DOWN });
        };
      }
          
      export function orderHealthDown() {
        return function (dispatch) {
          return dispatch({ type: ORDER_HEALTH_DOWN });
        };
      }
      
      export function orderHealthUp() {
        return function (dispatch) {
          return dispatch({ type: ORDER_HEALTH_UP });
        };
      }
     */







