import { SET_SELECTED_WORD_LIST,
				 WORD_LIST_LOADING,
				 WORD_LIST_LOAD_SUCCESS,
				 WORD_LIST_LOAD_ERROR
			 } from '../actions';

export const appStateReducer = (state = {}, action) => {
	switch (action.type) {
		case SET_SELECTED_WORD_LIST:
			return { ...state,
				selectedWordList: action.wordList
			};
		case WORD_LIST_LOADING:
			return {
				...state,
				loadStatus: 'loading',
				loadError: ''
			};
		case WORD_LIST_LOAD_SUCCESS:
			return {
				...state,
				loadStatus: 'success',
				loadError: ''
			};
		case WORD_LIST_LOAD_ERROR:
			return {
				...state,
				loadStatus: 'error',
				loadError: action.error
			};
		default:
			return state;
	}
};
