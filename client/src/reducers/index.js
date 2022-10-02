import { GET_RECIPES, GET_RECIPES_BY_NAME, SORT, GET_DIETS, FILTER_BY_DIETS, ORDER } from '../actions';
import { ASCENDENTE } from "../constants/sort"

const initialState = {
	recipes: [],
	RecipesByName: [],
	allDiets: [],	
	orderedRecipes: [],
	filteredRecipes: [],
	}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_RECIPES:
			return {
				...state,
				recipes: action.payload,
				recipesToShow: action.payload
			}

		case GET_RECIPES_BY_NAME:
			return {
				...state,
				RecipesByName: action.payload,
				recipesToShow: action.payload,
			}

		case SORT:
			let orderedRec = [...state.recipes]

			orderedRec = orderedRec.sort((a, b) => {
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
				RecipesByName: [],
				recipesToShow: [...orderedRec],

			}

		case ORDER:

			let orderedRecScore = [...state.recipes]

			orderedRecScore = orderedRecScore.sort((a, b) => {
				if (a.score < b.score) {
					return action.payload === ASCENDENTE ? -1 : 1;
				}
				if (a.score > b.score) {
					return action.payload === ASCENDENTE ? 1 : -1;
				}
				return 0;
			})
			return {
				...state,
				orderedRecipes: [...orderedRecScore],
				RecipesByName: [],
				recipesToShow: [...orderedRecScore],

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
			return {
				...state,
				filteredRecipes: recipesFiltered,
				RecipesByName: [],
				orderedRecipes: [],
				recipesToShow: recipesFiltered,

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

