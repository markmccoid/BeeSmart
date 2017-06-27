import _ from 'lodash';

import { LOAD_WORD_LIST } from '../actions';

export const currWordListReducer = (state = [], action) => {
	switch (action.type) {
		case LOAD_WORD_LIST:
			return action.wordList;

		default:
			return state;
	}
};
