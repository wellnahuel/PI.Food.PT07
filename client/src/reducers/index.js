import {
    GET_RECIPES
} from '../actions';

const initialState = {
    recipes:[],
} 
    
export default function reducer(state = initialState, action) {
	switch(action.type) {
		case GET_RECIPES: 
			return {
				...state,
				recipes: action.payload
			}
        default: 
            return state
	}
}
