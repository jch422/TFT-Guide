import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Empty = ({ isDark }) => {
  return (
    <Wrapper>
      <Msg isDark={isDark}>저장된 덱이 없습니다!</Msg>
      <Nav isDark={isDark} to="/">
        👉나만의 덱 만들기👈
      </Nav>
    </Wrapper>
  );
};

export default Empty;

const Wrapper = styled.div`
  text-align: center;
  padding-top: 200px;
`;

const Msg = styled.div`
  color: ${({ isDark }) => (isDark ? '#dbdbdb' : '#27282e')};
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Nav = styled(Link)`
  font-size: 2rem;
  color: ${({ isDark }) => (isDark ? '#eaeaea' : '#3d3d3d')};
  &:hover {
    color: #00c9a7;
  }
`;
