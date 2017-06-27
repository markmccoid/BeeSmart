import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import _ from 'lodash';

import { startLoadWordListIndex } from '../actions';
import AppSidebar from './AppSidebar';
import WordListContainer from './WordListContainer';
import PageContainer from './PageContainer';

class MainDisplay extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//dispatch action to get the unique application names stored in qvGroups.json
		this.props.loadWordListIndex();
	}


	render() {
		return (
			<div className="content-container">
				<nav className="content-nav">
					<h5 style={{textAlign: "center"}}>Word Lists</h5>
					<AppSidebar
						wordListIndex={this.props.wordListIndex}
					/>
				</nav>
				<main className="content-body">
						<Route  path="/wordlist/:wordList" component={WordListContainer} />
				</main>
			</div>
		);
}
};

const mapStateToProps = (state) => {
	return {
		wordListIndex: state.wordListIndex,
		selectedWordList: state.appState.selectedWordList || []
	}
};

export default connect(mapStateToProps, {
	loadWordListIndex: startLoadWordListIndex
})(MainDisplay);


// <GroupCreator
// 	selectedApplication={this.props.selectedApplication}
// />
