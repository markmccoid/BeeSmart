import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 10px;
	font-size: 1.2em;
`;

const Label = styled.label`
  padding: 5px;
	padding-bottom: 0;
  // border: 1px solid ${props => props.borderColor};
  // border-bottom: 0;
  // border-top-right-radius: 5px;
  // border-top-left-radius: 5px;
	// background-color: ${props => props.backgroundColor}
  width: 100%;
  font-weight: bold;
`;

const Text = styled.div`
  border: 1px solid ${props => props.borderColor};
  padding: 5px;
  background-color: ${props => props.backgroundColor};
`;

/** A simple Label/Text display.  The label is above the div containing the text
You can pass in border color and background colors*/
const TextWithLabel = (props) => {
  return (
    <Container>
      <Label>
        {props.label}
      </Label>
      <Text borderColor={props.borderColor}
        backgroundColor={props.textBackgroundColor}>
        {props.children || '-'}
      </Text>
    </Container>
  )
};

TextWithLabel.propTypes = {
  /** label text */
  label: PropTypes.string,
  /** content to display */
  text: PropTypes.string,
  /** border color for label and div containing content text */
  borderColor: PropTypes.string,
  /** background color for content text div - default is white */
  textBackgroundColor: PropTypes.string
};

TextWithLabel.defaultProps = {
  borderColor: 'black',
  textBackgroundColor: 'white'
};

export default TextWithLabel;
