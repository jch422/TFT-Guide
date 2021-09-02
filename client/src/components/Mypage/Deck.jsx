import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import champions from '../../JSON/champions.json';
import traits from '../../JSON/traits.json';
import Trait from './MyTrait';
import Unit from './Unit';

const Deck = styled.div`
  width: 80%;
  margin: 10px;
  list-style-type: none;
  background: #17394f;
  border: solid black 0.2rem;
  display: flex;
  flex-direction: row;
  min-width: 500px;
  padding: 8px;
`;
const Name = styled.span`
  flex: 0 1 10%;
  color: white;
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

function DeckBox({ data, index }) {
  const mydeck = data;
  let set = new Set(mydeck);

  let slimMydeck = [...set];

  // 챔피온 배열에서 중복제거하기 추가

  //  선택된 챔피언에 속한 트레잇을 객체 저가
  //    해당 객체의 카운트를 보고 색깔 정해서 객체 저장
  //    객체를 표시하는 코드에 맞게 변형해서 전달해주기
  let traitsAll = [];
  //트레잇을 모두 배열에 넣기
  for (let i in slimMydeck) {
    for (let j = 0; j < Object.keys(champions).length; j++) {
      if (slimMydeck[i] === champions[j].championId) {
        traitsAll.push(champions[j].traits);
      }
    }
  }
  // 이차원배열 풀기
  let traitsAllList = traitsAll.reduce(function (acc, cur) {
    return acc.concat(cur);
  });
  let traitsObj = {};
  // 중첩 카운트 객체로 만들기
  for (let i = 0; i < traitsAllList.length; i++) {
    if (!traitsObj[traitsAllList[i]]) {
      traitsObj[traitsAllList[i]] = 1;
    } else {
      traitsObj[traitsAllList[i]]++;
    }
  }
  // 트레잇 색깔 찾기
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
    <Deck>
      <Name>{`${index + 1}번`}</Name>
      <Synergy>
        {finalTraitsList.map((data, index) => (
          <Trait key={index} data={data} />
        ))}
      </Synergy>
      <Champ>
        {mydeck.map((el, index) => {
          // const imgsrc = '../TFTData/champions/' + el + '.png';
          // return <img alt="" src={imgsrc} width="50" height="50" />;
          return <Unit key={index} el={el} />;
        })}
      </Champ>
    </Deck>
  );
}

export default DeckBox;
