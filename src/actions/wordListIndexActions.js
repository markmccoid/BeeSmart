import * as api from '../api';

import { LOAD_WORD_LIST_INDEX } from './actionTypes';

//-----------------------------------------------
//Loads the word list information from the /data/wordListIndex.json file
export const loadWordListIndex = (wordListIndex) => {
	return {
		type: LOAD_WORD_LIST_INDEX,
		wordListIndex
	}
};

export const startLoadWordListIndex = () => {
	return dispatch => {
		//Get list of Applications in the QVVariables.json file on server
		const request = api.getWordListIndex();
			request.then(data => {
				dispatch(loadWordListIndex(data));
			});
	};
};
//------------------------------------------------
