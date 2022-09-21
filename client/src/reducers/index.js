import {
    GET_RECIPES, GET_RECIPES_BY_NAME, GET_RECIPE_BY_ID
} from '../actions';

const ASCENDENTE = 'ascendente';
const LOW = 'ascendente';



const initialState = {
    recipes:[],
	filteredRecipes: [],
	recipeById: {},
	diets: [],
	orderedRecipes: [],
	flag: "All",	
} 
    
export default function reducer(state = initialState, action) {
	switch(action.type) {
		case GET_RECIPES: 
			return {
				...state,
				recipes: action.payload,
				filteredRecipes: action.payload
				
			}
		case GET_RECIPES_BY_NAME: 
			return {
				...state,
				filteredRecipes: action.payload
			}

		case "ORDER_AZ":
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
		
		case "ORDER_ZA":
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
			return { ...state, orderedRecipes: OrdenZA };
	
		case "ORDER_SCORE_UP":
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
		
		case "ORDER_SCORE_DOWN":
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
			return { ...state, orderedRecipes: OrdenScoreDown };
	
		case "ORDER_HEALTH_DOWN":
			var orderedScore = state.orderedRecipes.sort(function (a, b) {
				if (a.healthScore > b.healthScore) {
				return 1;
				}
				if (a.healthScore < b.healthScore) {
				return -1;
				}
				return 0;
			});
			var OrdenScoreDown = orderedScore.map((recipe) => recipe);
			return { ...state, orderedRecipes: OrdenScoreDown };
	
		case "ORDER_HEALTH_UP":
			var orderedScore = state.orderedRecipes.sort(function (a, b) {
				if (a.healthScore < b.healthScore) {
				return 1;
				}
				if (a.healthScore > b.healthScore) {
				return -1;
				}
				return 0;
			});
			var OrdenScoreUp = orderedScore.map((recipe) => recipe);
			return { ...state, orderedRecipes: OrdenScoreUp };
			
			case GET_RECIPE_BY_ID: {
				return {
					...state,
					recipeById: action.payload,
				};
			}
			

        default: 
            return state
	}
}
