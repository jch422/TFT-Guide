import React from 'react';
import styled from 'styled-components';
import champions from '../../JSON/champions.json';
import traits from '../../JSON/traits.json';
import Trait from './MyTrait';
import Unit from './Unit';

const Deck = styled.div`
  width: 80%;
  margin: 10px;
  list-style-type: none;
  background: ${({ isDark }) => (isDark ? '#cccccc' : '#1b374a')};
  border: solid ${({ isDark }) => (isDark ? 'transparent' : 'black')} 0.2rem;
  display: flex;
  flex-direction: row;
  min-width: 500px;
  padding: 8px;
  align-items: center;
`;
const Name = styled.span`
  flex: 0 1 10%;
  color: ${({ isDark }) => (isDark ? '#36393f' : 'white')};
  display: flex;
  align-self: center;
`;
const Synergy = styled.span`
  flex: 2 1 30%;
  display: flex;
  align-self: center;
`;
const Champ = styled.span`
  flex: 3 1 60%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const DeleteBtn = styled.button`
  border: none;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    background-color: red;
    color: white;
  }
`;

function DeckBox({ deck, index, id, isDark, deleteDeck }) {
  const mydeck = deck.slice(0, deck.length - 1);
  let set = new Set(mydeck);

  let slimMydeck = [...set];
  let traitsAll = [];
  for (let i in slimMydeck) {
    for (let j = 0; j < Object.keys(champions).length; j++) {
      if (slimMydeck[i] === champions[j].championId) {
        traitsAll.push(champions[j].traits);
      }
    }
  }
  let traitsAllList = traitsAll.reduce(function (acc, cur) {
    return acc.concat(cur);
  });
  let traitsObj = {};
  for (let i = 0; i < traitsAllList.length; i++) {
    if (!traitsObj[traitsAllList[i]]) {
      traitsObj[traitsAllList[i]] = 1;
    } else {
      traitsObj[traitsAllList[i]]++;
    }
  }
  let finalTraitsList = [];
  for (let i in traitsObj) {
    let color = '';
    let traitKr = '';
    let traitEn = '';
    for (let j = 0; j < Object.keys(traits).length; j++) {
      if (i === traits[j].key) {
        for (let k = 0; k < traits[j].sets.length; k++) {
          if (traitsObj[i] >= traits[j].sets[k].min) {
            color = traits[j].sets[k].style;
            traitKr = traits[j].kr_name;
            traitEn = traits[j].key;
          }
        }
      }
    }
    if (color) {
      let str = traitEn + '+' + color + '+' + traitKr;
      finalTraitsList.push(str);
    }
  }

  return (
    <Deck isDark={isDark}>
      <Name isDark={isDark}>{`${index + 1}번`}</Name>
      <Synergy>
        {finalTraitsList.map((data, index) => (
          <Trait key={index} data={data} />
        ))}
      </Synergy>
      <Champ>
        {mydeck.map((el, index) => {
          return <Unit key={index} el={el} />;
        })}
      </Champ>
      <DeleteBtn onClick={() => deleteDeck(id)}>&times;</DeleteBtn>
    </Deck>
  );
}

export default DeckBox;
