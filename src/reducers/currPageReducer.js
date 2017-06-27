import { SAVE_PAGE_DATA, SET_PAGE_NUMBER } from '../actions';

export const currPageReducer = (state = {}, action) => {
	switch (action.type) {
		case SAVE_PAGE_DATA:
			return {
				pageNumber: state.pageNumber,
				pageData: action.pageData
			};
		case SET_PAGE_NUMBER:
			return {
				...state,
				pageNumber: action.pageNumber
			}
		default:
			return state;
	}
};
