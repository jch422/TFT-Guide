import styled from 'styled-components';

import RecommendItem from './RecommendItem.jsx';

const RecommendList = ({ champions, handleRecommendItemClick, isDark }) => {
  const recommendItems = champions.map((champion, idx) => (
    <RecommendItem
      key={idx}
      {...champion}
      isDark={isDark}
      championData={champion}
      handleRecommendItemClick={handleRecommendItemClick}
    />
  ));

  return <RecommentItemsContainer>{recommendItems}</RecommentItemsContainer>;
};

export default RecommendList;

const RecommentItemsContainer = styled.div`
  min-width: 12rem;
  display: flex;
  flex-direction: column;
  @media (max-width: 1200px) {
    justify-content: space-between;
    flex-direction: row;
    min-width: 500px;
  }
  @media (max-width: 550px) {
    min-width: 460px;
  }
`;
