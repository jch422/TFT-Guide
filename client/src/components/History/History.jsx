import React from 'react';
import styled from 'styled-components';
import Trait from './Trait';
import Unit from './Unit/Unit';

function History({ data, puuid }) {
  const matchDate = new Date(data.info.game_datetime);
  let year = matchDate.getFullYear(); // 년도
  let month = matchDate.getMonth() + 1; // 월
  let date = matchDate.getDate(); // 날짜
  const matchTime = new Date(data.info.game_length);
  let minute = parseInt(matchTime / 60);
  let second = parseInt((matchTime - minute) / 60);
  let myMatch = {};
  for (let i of data.info.participants) {
    if (i.puuid === puuid) {
      myMatch = i;
    }
  }
  function compare(a, b) {
    const bandA = b.style;
    const bandB = a.style;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
  let myTraits = myMatch.traits.sort(compare).filter(x => x.style > 0);
  let myUnits = myMatch.units;
  return (
    <Div>
      <Summary>
        <SummarySpan>{'#' + myMatch.placement}</SummarySpan>
        <SummarySpan>{data.tft_game_type === 'standard' ? '일반' : '랭크'}</SummarySpan>
        <SummarySpan>{minute + ':' + second}</SummarySpan>
        <SummarySpan>{year + '/' + month + '/' + date}</SummarySpan>
      </Summary>
      <TraitsContainer>
        {myTraits.map((data, index) => (
          <Trait key={index} data={data} />
        ))}
      </TraitsContainer>
      <UnitsContainer>
        {myUnits.map((data, index) => (
          <Unit key={index} data={data} />
        ))}
      </UnitsContainer>
    </Div>
  );
}
export default History;

const Div = styled.div`
  width: 100%;
  margin: 0 auto;
  list-style-type: none;
  background: #ffffff;
  border: solid rgb(238, 238, 238) 0.2rem;
  display: flex;
  max-width: 800px;
  min-width: 500px;
  padding: 8px;
`;
const Summary = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: auto;
  flex: 0 1 90px;
`;
const TraitsContainer = styled.div`
  flex: 0 1 250px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const UnitsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start !important;
  flex-wrap: wrap;
`;
const SummarySpan = styled.span`
  display: table-cell;
  vertical-align: middle;
`;
