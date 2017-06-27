import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Checkbox from 'antd/lib/checkbox';
//import 'antd/lib/checkbox/style/css';

const SearchContainer = styled.div`
	display: flex;
	margin-left: 25px;
	align-items: center;
`;
const Input = styled.input`
	margin:0 10px;

`;
const CheckStyled = styled(Checkbox)`
	width: 250px;
`;
const Search = (props) => {

	const handleSearch = (searchText, showNewWordsOnly) => {
		props.onFilterWords(searchText, showNewWordsOnly);
	};

		return (
			<SearchContainer>
				<h6>Search:</h6>
				<Input
					type='text'
					value={props.searchText}
					onChange={e => handleSearch(e.target.value, props.showNewWordsOnly)}
				/>
				<CheckStyled
					onChange={e => handleSearch(props.searchText, e.target.checked)}
					checked={props.showNewWordsOnly}
				>
					Only New Words
				</CheckStyled>
			</SearchContainer>
		);

}

Search.propTypes = {
  onFilterWords: PropTypes.func,
	searchText: PropTypes.string,
	showNewWordsOnly: PropTypes.bool
}

export default Search;


// class Search extends React.Component {
//
// 	handleSearch = (searchText, showNewWordsOnly) => {
// 		this.props.onFilterWords(searchText, showNewWordsOnly);
// 	}
// 	render() {
//
// 		return (
// 			<SearchContainer>
// 				<h6>Search:</h6>
// 				<Input
// 					type='text'
// 					value={this.props.searchText}
// 					onChange={e => this.handleSearch(e.target.value, this.props.showNewWordsOnly)}
// 				/>
// 				<CheckStyled
// 					onChange={e => this.handleSearch(this.props.searchText, e.target.checked)}
// 					checked={this.props.showNewWordsOnly}
// 				>
// 					Only New Words
// 				</CheckStyled>
// 			</SearchContainer>
// 		);
// 	}
// }
