import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RecommendUnit from './RecommendUnit';

function Recommend({ campionList }) {
  const [data, setData] = useState(null);
  const getData = async () => {
    const res = await axios.post('http://localhost:8000/recommend', {
      champions: campionList,
      level: 2,
    });
    setData(res.data.data);
  };
  useEffect(() => {
    getData();
  }, [campionList]);
  return (
    <RecommendContainer>
      {data !== null ? (
        <div>
          {data.map((data, index) => (
            <RecommendUnit data={data} key={index} />
          ))}
        </div>
      ) : null}
    </RecommendContainer>
  );
}

export default Recommend;

const RecommendContainer = styled.div``;
