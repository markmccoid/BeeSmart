import _ from 'lodash';

import { LOAD_WORD_LIST_INDEX } from '../actions';

export const wordListIndexReducer = (state = [], action) => {
	switch (action.type) {
		case LOAD_WORD_LIST_INDEX:
			return action.wordListIndex;
		default:
			return state;
	}
};
