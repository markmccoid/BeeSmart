import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Checkbox from 'antd/lib/checkbox';

import TextWithLabel from '../common/TextWithLabel';

//----Styled Components -----//
const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 5px;
  margin: 10px;
  width: 500px;
  background-color: ${props => props.isNewWord ? 'lightcoral' : 'cornsilk'};
`;
const CardGroup = styled.div`
  display: flex;
  justify-content: flex-start;
`
const DeleteContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`
const CheckboxStyled = styled(Checkbox)`
  border: 1px solid red;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100px;
  padding: 5px;
`
//----WordCard Component -----//
const WordCard = (props) => {
  const { wordObj } = props;
	//set the border color for the text
	const borderColor= 'chocolate';
  return (
    <CardDiv isNewWord={wordObj.isNewWord}>
      <DeleteContainer>
        <CheckboxStyled onChange={e => props.onDeleteToggle(wordObj.id, e.target.checked)}>Delete</CheckboxStyled>
      </DeleteContainer>
      <CardGroup>
        <TextWithLabel label="Word" borderColor={borderColor}>{wordObj.word}</TextWithLabel>
        <TextWithLabel label="Diacritic" borderColor={borderColor}>{wordObj.diacritic}</TextWithLabel>
      </CardGroup>
			<CardGroup>
				<TextWithLabel label="Syllables" borderColor={borderColor}>{wordObj.syllables}</TextWithLabel>
				<TextWithLabel label="Part of Speech" borderColor={borderColor}>{wordObj.partOfSpeech}</TextWithLabel>
			</CardGroup>
      <CardGroup>
				<TextWithLabel label="Origin" borderColor={borderColor}>{wordObj.origin || '-'} </TextWithLabel>
      </CardGroup>


      <div>{wordObj.isNewWord ? "New Word" : ""}</div>

    </CardDiv>
  )
};

WordCard.propTypes = {
  wordObj: PropTypes.shape({
    id: PropTypes.string,
    word: PropTypes.string,
    syllables: PropTypes.string,
    partOfSpeech: PropTypes.string,
    diacritic: PropTypes.string,
    origin: PropTypes.string,
    isNewWord: PropTypes.bool,
    mwLink: PropTypes.string,
  }),
	/** params: id (string), checked (bool)*/
	onDeleteToggle: PropTypes.func
}
export default WordCard;

//
// <div style={{display:"flex", flexDirection:"column", width:"100%", marginRight:"10px"}}>
// <label>Syllables</label>
// <CardItem inGroup>{wordObj.syllables}</CardItem>
// </div>
//<CardItem>{wordObj.origin || '-'} </CardItem>
