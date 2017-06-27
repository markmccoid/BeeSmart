import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

import WordCard from './WordCard/WordCard';
import PageControl from './PageControl/PageControl';
import Search from './Search';

//----Styled Components -----//
const WordCardDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const PageControlSearchContainer = styled.div`
	display: flex;
	align-items: center;
`;
//----PageContainer Component -----//
class PageContainer extends React.Component {
  constructor(props) {
    super(props);
		this.idsToDelete = [];
  }

  componentWillReceiveProps(nextProps) {
    //Handle when search limits numberOfPages to less than what is currently in redux store.
    if (nextProps.pageNumber > nextProps.numberOfPages) {
      // nextProps.numberOfPages;
      this.props.onSetPageNumber(nextProps.numberOfPages);
    }

  }

	handleDeleteToggle = (id, checked) => {
	//Will get an id and a checked flag.  If flag is true,
	//then this word is to be deleted (add to delete array), if false, then remove it
	//from the static idsToDelete array
		if (checked) {
			this.idsToDelete.push(id);
		} else {
			_.remove(this.idsToDelete, currId => currId === id);
		}
	}

  handlePageChange = pageNumber => {
    pageNumber = pageNumber < 1 ? 1 : pageNumber;
    pageNumber = pageNumber > this.props.numberOfPages ? this.props.numberOfPages : pageNumber;
    this.props.onSetPageNumber(pageNumber);
  }

  render() {
    let { pageData, numberOfPages } = this.props.pageInfo;
    return (
      <div>
        <h4>{this.props.wordListName}</h4>
        <h6>{`Number Of Pages - ${numberOfPages}`}</h6>
        <PageControlSearchContainer>
        	<PageControl pageNumber={this.props.pageNumber} onPageChange={this.handlePageChange} />
        	<Search
            onFilterWords={this.props.onFilterWords}
            searchText={this.props.searchText}
            showNewWordsOnly={this.props.showNewWordsOnly}
          />
				<button className="button primary" onClick={() => this.props.onDeleteWords(this.props.wordListName, this.idsToDelete)}>Delete Selected</button>
        </PageControlSearchContainer>
        <WordCardDiv>
          {pageData.map(wordObj => {
              return (
								<WordCard
									key={wordObj.id}
									wordObj={wordObj}
									onDeleteToggle={this.handleDeleteToggle}
								/>
								)
            })}
        </WordCardDiv>
      </div>
    );
  }
}

PageContainer.propTypes = {
  onSetPageNumber: PropTypes.func,
  onSavePageData: PropTypes.func,
  onFilterWords: PropTypes.func,
	/** Parms: wordList (string), idsToDelete (array) */
	onDeleteWords: PropTypes.func,
  pageNumber: PropTypes.number,
  numberOfPages: PropTypes.number,
  pageInfo: PropTypes.object,
  wordListName: PropTypes.string,
  searchText: PropTypes.string,
  showNewWordsOnly: PropTypes.bool
}
export default PageContainer;

/**
pageInfo.pageData
{
	id,
	word,
	syllables,
	partOfSpeech,
	origin,
	isNewWord,
	mwLink
}
*/
