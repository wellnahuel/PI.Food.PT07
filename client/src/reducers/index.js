import {
    GET_RECIPES, GET_RECIPES_BY_NAME, SORT
} from '../actions';

const ASCENDENTE = 'ascendente';


const initialState = {
    recipes:[],
	filteredRecipes: [],
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
