import * as api from '../api';

import { SAVE_PAGE_DATA, SET_PAGE_NUMBER } from './actionTypes';

//------------------------------------------------
export const savePageData = pageData => {
  return {
    type: SAVE_PAGE_DATA,
    pageData
  };
};

export const setPageNumber = pageNumber => {
	return {
		type: SET_PAGE_NUMBER,
		pageNumber
	};
};
