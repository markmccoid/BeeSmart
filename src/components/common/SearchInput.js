import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputStyled = styled.input`
  margin: 0;
  width: 55px;
  height: 25px;
`;

/*****
Reusable controlled input used for searching
No button needed.
When "enter" key is pressed, the passed onEnterPressed
function is called with the input value as an argument
*/
class SearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: this.props.inputPageNumber
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({inputValue: nextProps.inputPageNumber})
  }
  checkKeyPress = e => {
    //check for enter key press
    if(e.keyCode === 13) {
      this.props.onEnterPressed(this.state.inputValue);
    }
  }

  render() {
    return (
      <div>
        <InputStyled
          type="text"
          value={this.state.inputValue}
          onChange={(e) => this.setState({inputValue: e.target.value})}
          onKeyDown={(e) => this.checkKeyPress(e)}
        />
      </div>
    );
  }
}

SearchInput.propTypes = {
  inputPageNumber: PropTypes.number,
  onEnterPressed: PropTypes.func
}

export default SearchInput;
