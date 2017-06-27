import * as api from '../api';

import { LOAD_WORD_LIST,
				 WORD_LIST_LOADING,
				 WORD_LIST_LOAD_SUCCESS,
				 WORD_LIST_LOAD_ERROR,
			 	 SET_PAGE_NUMBER,
			 	 DELETE_WORDS } from './actionTypes';
import { setSelectedWordList } from './appStateActions';

//-----------------------------------------------
//Loads the word list information from the /data/wordListIndex.json file
export const loadWordList = (wordList) => {
	return {
		type: LOAD_WORD_LIST,
		wordList
	}
};

export const startLoadWordList = wordList => {
	return dispatch => {
		//Set the appState to the word list selected
		dispatch(setSelectedWordList(wordList));
		//reset page number to 1
		dispatch({type: SET_PAGE_NUMBER, pageNumber: 1})
		//Set the loading flag for the wordlist
		dispatch({type: WORD_LIST_LOADING});
		//Get list of Applications in the QVVariables.json file on server
		const request = api.getWordList(wordList);
			request.then(data => {
				dispatch(loadWordList(data));
				dispatch({type: WORD_LIST_LOAD_SUCCESS});
			})
			.catch(err => {
				dispatch({type: WORD_LIST_LOAD_ERROR, error: err});
			});
	};
};

//===============================
//-DELETE_WORDS
//===============================
export const deleteWords = (wordList) => {
	//Once words have been deleted from server file we could
	//remove them from the list already in redux store OR
	//Just tell it to reload the word list.
	return {
		type: LOAD_WORD_LIST,
		wordList
	}
};
export const startDeleteWords = (wordList, idsToDelete) => {
	return dispatch => {
		api.deleteWordsFromList(wordList, idsToDelete)
			.then(data => {
				dispatch(startLoadWordList(wordList));
				console.log('delete words thunk', data);
			});
	};
};
