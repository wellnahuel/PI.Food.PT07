import {
    GET_RECIPES, GET_RECIPES_BY_NAME
} from '../actions';

const initialState = {
    recipes:[],
	filteredRecipes: [],
} 
    
export default function reducer(state = initialState, action) {
	switch(action.type) {
		case GET_RECIPES: 
			return {
				...state,
				recipes: action.payload
				
			}
			case GET_RECIPES_BY_NAME: 
			return {
				...state,
				recipes: action.payload
			}

        default: 
            return state
	}
}
