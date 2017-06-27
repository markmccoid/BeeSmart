import _ from 'lodash';

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
export const filterWords = function(wordData, searchText, showNewWordsOnly = false) {
	//-------------------
	//- wordData : array of objects for the word list selected
	//- searchText : text searching for
	//- showNewWordsOnly : only show word with
	//-------------------

	let filteredwordData = [...wordData];
	//Handle if only showing new words
	if(showNewWordsOnly) {
		filteredwordData = filteredwordData.filter((value) => value.isNewWord);
	}

	//Handle search string searching
	if (searchText.length > 0) {
		//This function makes sure that any regex special chars are escaped.
		//convert input string to a regular expression object to pass to match function
		let reSearchString = new RegExp(_.escapeRegExp(searchText.toLowerCase()), "g");
		filteredwordData = filteredwordData.filter(function(item){
			if (item.word) {
				return item.word.toLowerCase().match(reSearchString);
			}
		});
	}
	return filteredwordData;
};
