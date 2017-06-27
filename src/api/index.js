import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
const API_URL = 'http://localhost:3001';

export const getWordListIndex = () => {
	return axios.get(`/api/wordlists`)
		.then(response => {
			return response.data
		})
};

//Get a single word list's data
export const getWordList = wordList => {
	return axios.get(`./api/wordlists/${wordList}`)
		.then(response => {
			//need to deal with error responses i.e. wordList that doesn't exist.
			return response.data
		})
};

export const deleteWordsFromList = (wordList, idsToDelete) => {
	//Using a post for a delete action against the words, cause I don't know no better
	return axios.post(`./api/wordlists/${wordList}`, { idsToDelete: idsToDelete })
			.then(response => {
				//should return the word list with the idsToDelete deleted.
				return response.data;
			});
};
