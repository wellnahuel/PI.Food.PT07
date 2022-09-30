import {
	GET_RECIPES, GET_RECIPES_BY_NAME, GET_RECIPE_BY_ID, SORT, GET_DIETS, FILTER_BY_DIETS, ORDER/* ORDER_HEALTH_DOWN, ORDER_HEALTH_UP */
} from '../actions';

/* const ASCENDENTE = 'ascendente';
const LOW = 'ascendente'; */
import { ASCENDENTE, /* DESCENDENTE */ } from "../constantes/sort"



const initialState = {
	recipes: [],
	RecipesByName: [],
	recipeById: {},
	allDiets: [],
	diets: [],
	orderedRecipes: [],
	filteredRecipes: [],
	flag: "All",
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_RECIPES:
			return {
				...state,
				recipes: action.payload,
				//filteredRecipes: action.payload,
				//orderedRecipes: action.payload
			}
		case GET_RECIPES_BY_NAME:
			return {
				...state,
				RecipesByName: action.payload
			}

			case GET_RECIPE_BY_ID: {
			return {
				...state,
				recipeById: action.payload,
			};
		}

		case SORT:
			let orderedRec = [...state.recipes]

			orderedRec = orderedRec.sort((a,b) => {
				if (a.name < b.name) {
					return action.payload === ASCENDENTE ? -1 : 1;
				}
				if (a.name > b.name) {
					return action.payload === ASCENDENTE ? 1 : -1;
				}
				return 0;
			})
			return {
				...state,
				orderedRecipes: [...orderedRec],
				RecipesByName: []
			}

		case ORDER: 

			let orderedRecScore = [...state.recipes]

			orderedRecScore = orderedRecScore.sort((a,b) => {
				if (a.healthScore < b.healthScore) {
					return action.payload === ASCENDENTE ? -1 : 1;
				}
				if (a.healthScore > b.healthScore) {
					return action.payload === ASCENDENTE ? 1 : -1;
				}
				return 0;
			})
			return {
				...state,
				orderedRecipes: [...orderedRecScore],
				RecipesByName: []


			}	

		case GET_DIETS: 
			return {
				...state,
				allDiets: action.payload,
			};
			

		case FILTER_BY_DIETS: {

			const allRecipes = state.recipes
			
			const recipesFiltered = action.payload === '' ? allRecipes : allRecipes.filter(
				element => element.diets.includes(action.payload)
			)
			/* (element => element.allDiets === action.payload) */
			return {
				...state,
				filteredRecipes: recipesFiltered,
				RecipesByName: [],
				orderedRecipes: []

			} 
		}	

		case 'POST_RECIPE':
			return {
				...state
			}
			
		default:
			return state
	}
}

