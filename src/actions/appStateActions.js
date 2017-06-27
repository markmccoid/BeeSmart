import * as api from '../api';
import { SET_SELECTED_WORD_LIST
} from './actionTypes';

export const setSelectedWordList = wordList => {
  return {
    type: SET_SELECTED_WORD_LIST,
    wordList
  }
};
