import * as ActionTypes from './ActionTypes';

export const favorites = (state = [], action) => {
	switch (action.type) {
		case ActionTypes.ADD_FAVORITE:
			if (state.some(elem => elem === action.payload)) {
				return state;
			} else {
				return state.concat(action.payload);
			}
		case ActionTypes.POST_FAVORITE:
			return
		case ActionTypes.DELETE_FAVORITE:
			return state.filter(fav => fav != action.payload);
		default:
			return state;
	}

}