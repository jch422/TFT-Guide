import React from 'react';
import styled from 'styled-components';
import { SearchJSONData } from '../SearchJSONData';

function RecommendUnit({ data }) {
  return (
    <UnitContainer /*onClick={ 대시보드에 챔피언 추가하는 함수 }*/>
      <div>
        <Img src={`../TFTData/champions/${data[0]['championId']}.png`}></Img>
      </div>
      <div>
        <span>{data[0]['kr_name']}</span>
      </div>
      <div>
        {data[0]['traits'].map(trait => (
          <span>{SearchJSONData('traits', trait)['kr_name']}</span>
        ))}
      </div>
      <div>
        <span>{data[0]['cost']}</span>
      </div>
    </UnitContainer>
  );
}

export default RecommendUnit;

const UnitContainer = styled.div`
  display: flex;
`;
const Img = styled.img`
  height: 30px;
`;
