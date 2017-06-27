import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SearchInput from '../common/SearchInput';

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  text-align: center;
`;
const Button = styled.a`
  border: 1px solid chocolate;
  background-color: coral;
  color: white;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

/**
* Control that shows what page you are on and gives buttons for moving to "Prev" or "Next" page.
* You can also enter a number and hit enter to go to that page.
*/
const PageControl = (props) => {
  //--Function to validate a pageNumber and pass it to Redux Action Creator.
  const handleSearch = pageNumber => {
    //validate that it is a number
    if (pageNumber == parseInt(pageNumber) && parseInt(pageNumber) > 0) {
      //This will call a redux action creator and update the page number in the store
      props.onPageChange(parseInt(pageNumber));
    } else {
      alert ('Please enter a positive integer for the page number');
    }
  };
  return (
    <Wrapper>
      <Button onClick={() => props.onPageChange(props.pageNumber-1)}
      >
        Prev
      </Button>
       <SearchInput
        inputPageNumber={props.pageNumber}
        onEnterPressed={handleSearch}
      />
      <Button onClick={() => props.onPageChange(props.pageNumber+1)}
      >
        Next
      </Button>
    </Wrapper>
  );
};

PageControl.propTypes = {
  onPageChange: PropTypes.func,
  pageNumber: PropTypes.number
};

export default PageControl;
//
// <SearchInput
//   initialValue={props.pageNumber}
//   onEnterPressed={this.handleSearch}
// />
