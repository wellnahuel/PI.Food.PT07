import {
	GET_RECIPES, GET_RECIPES_BY_NAME, GET_RECIPE_BY_ID, SORT/* , ORDER_AZ, ORDER_ZA,  ORDER_SCORE_UP, ORDER_SCORE_DOWN,  ORDER_HEALTH_DOWN, ORDER_HEALTH_UP */
} from '../actions';

/* const ASCENDENTE = 'ascendente';
const LOW = 'ascendente'; */
import { ASCENDENTE, /* DESCENDENTE */ } from "../constantes/sort"



const initialState = {
	recipes: [],
	filteredRecipes: [],
	recipeById: {},
	diets: [],
	orderedRecipes: [],
	flag: "All",
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_RECIPES:
			return {
				...state,
				recipes: action.payload,
				filteredRecipes: action.payload,
				orderedRecipes: action.payload
			}
		case GET_RECIPES_BY_NAME:
			return {
				...state,
				filteredRecipes: action.payload
			}

		/* case ORDER_AZ:
			console.log(state.orderedRecipes)
			var orderedAZ = state.orderedRecipes.sort(function (a, b) {
				if (a.title > b.title) {
					return 1;
				}
				if (a.title < b.title) {
					return -1;
				}
				return 0;
			});
			let OrderAZ = orderedAZ.map((recipe) => recipe);
			return { ...state, orderedRecipes: OrderAZ };

		case ORDER_ZA:
			var orderedZA = state.orderedRecipes.sort(function (a, b) {
				if (a.title < b.title) {
					return 1;
				}
				if (a.title > b.title) {
					return -1;
				}
				return 0;
			});
			let OrdenZA = orderedZA.map((recipe) => recipe);
			return { ...state, orderedRecipes: OrdenZA }; */

		/* case ORDER_SCORE_UP:
			var orderedScore = state.orderedRecipes.sort(function (a, b) {
				if (a.spoonacularScore < b.spoonacularScore) {
					return 1;
				}
				if (a.spoonacularScore > b.spoonacularScore) {
					return -1;
				}
				return 0;
			});
			let OrdenScore = orderedScore.map((recipe) => recipe);
			return { ...state, orderedRecipes: OrdenScore };

		case ORDER_SCORE_DOWN:
			var orderedScore = state.orderedRecipes.sort(function (a, b) {
				if (a.spoonacularScore > b.spoonacularScore) {
					return 1;
				}
				if (a.spoonacularScore < b.spoonacularScore) {
					return -1;
				}
				return 0;
			});
			var OrdenScoreDown = orderedScore.map((recipe) => recipe);
			return { ...state, orderedRecipes: OrdenScoreDown }; */

		/* case ORDER_HEALTH_DOWN:
			var orderedScoreDown = state.orderedRecipes.sort(function (a, b) {
				if (a.healthScore > b.healthScore) {
					return 1;
				}
				if (a.healthScore < b.healthScore) {
					return -1;
				}
				return 0;
			});
			var orderedScore = orderedScoreDown.map((recipe) => recipe);
			return { ...state, orderedRecipes: orderedScore };

		case ORDER_HEALTH_UP:
			var OrdenScoreUp = state.orderedRecipes.sort(function (a, b) {
				if (a.healthScore < b.healthScore) {
					return 1;
				}
				if (a.healthScore > b.healthScore) {
					return -1;
				}
				return 0;
			});
			var orderedScore = OrdenScoreUp.map((recipe) => recipe);
			return { ...state, orderedRecipes: orderedScore };
 */
		case GET_RECIPE_BY_ID: {
			return {
				...state,
				recipeById: action.payload,
			};
		}

		case SORT:
			let orderedRecipes = [...state.recipes]

			orderedRecipes = orderedRecipes.sort((a,b) => {
				if (a.title < b.title) {
					return action.payload === ASCENDENTE ? -1 : 1;
				}
				if (a.title > b.title) {
					return action.payload === ASCENDENTE ? 1 : -1;
				}
				return 0;
			})
			return {
				...state,
				filteredRecipes: [...orderedRecipes]
			}

		


		default:
			return state
	}
}
