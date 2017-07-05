import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { startLoadWordList, startDeleteWords, setPageNumber, savePageData } from '../actions';
import { filterWords } from '../helpers';

import PageContainer from './PageContainer';


class WordListContainer extends React.Component {
  state = {
    searchText: '',
    showNewWordsOnly: false
  };

  componentDidMount() {
		//Load the words from the selected list
    this.props.loadWordList(this.props.match.params.wordList);
  }
  componentWillReceiveProps (nextProps) {
		//Need to check if a new wordList has been selected and load this new
		//wordList.  The componentDidMount will only run once.
    if (nextProps.match.params.wordList !== this.props.match.params.wordList) {
      this.props.loadWordList(nextProps.match.params.wordList);
    }
  }
  /** Returns an object with the pageData object and the number of pages*/
  getPageData = (currWordList, pageNumber, wordsPerPage) => {
    //Filter words if needed
    let filteredWordList = filterWords(currWordList, this.state.searchText, this.state.showNewWordsOnly);
    //calculate how many pages
    let numberOfPages = Math.ceil((filteredWordList.length)/wordsPerPage);

    //find start and end array positions
    let startPagePos = (pageNumber * wordsPerPage) - wordsPerPage;
    let endPagePos = pageNumber * wordsPerPage;
    let pageData = filteredWordList.slice(startPagePos, endPagePos);
    //Return an object {pageData, numberOfPages}
    return {pageData, numberOfPages};
  }

  handleFilterWords = (searchText, showNewWordsOnly) => {
    this.setState({
      searchText,
      showNewWordsOnly
    });
  }
  render() {
    let { loadStatus, loadError } = this.props.appState;
		let { wordList } = this.props.match.params;
		let { pageNumber } = this.props.currPage || {pageNumber: 1};
    let wordListJSX = <div>Loading</div>;
    let wordPerPage = parseInt(this.props.settings.wordsPerPage);
    if (loadStatus === 'success') {
      let pageInfo = this.getPageData(this.props.currWordList, pageNumber, wordPerPage);
      wordListJSX = (
        <PageContainer
          pageNumber={pageNumber}
          numberOfPages={pageInfo.numberOfPages}
          pageInfo={pageInfo}
          wordListName={wordList}
          onSavePageData={this.props.savePageData}
          onSetPageNumber={this.props.setPageNumber}
          onFilterWords={this.handleFilterWords}
					onDeleteWords={this.props.deleteWords}
          searchText={this.state.searchText}
          showNewWordsOnly={this.state.showNewWordsOnly}
        />
    );
    }
		return (
      <div>
        {wordListJSX}
      </div>
		);
  }
}

const mapStateToProps = state => {
  return {
    appState: state.appState,
    currWordList: state.currWordList,
		currPage: state.currPage,
    settings: state.settings
  }
};

export default connect(mapStateToProps, {
  loadWordList: startLoadWordList,
	deleteWords: startDeleteWords,
	setPageNumber: setPageNumber,
  savePageData: savePageData
})(WordListContainer);
