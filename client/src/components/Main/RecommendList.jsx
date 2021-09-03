import styled from 'styled-components';

import RecommendItem from './RecommendItem.jsx';

const RecommendList = ({ champions, handleRecommendItemClick }) => {
  const recommendItems = champions.map((champion, idx) => (
    <RecommendItem
      key={idx}
      {...champion}
      championData={champion}
      handleRecommendItemClick={handleRecommendItemClick}
    />
  ));

  return <RecommentItemsContainer>{recommendItems}</RecommentItemsContainer>;
};

export default RecommendList;

const RecommentItemsContainer = styled.div`
  min-width: 12rem;
`;
