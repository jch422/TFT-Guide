import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import MainPage from '../pages/MainPage.jsx';
import MyPage from '../pages/MyPage.jsx';
import HistorySearch from '../pages/HistorySearch.jsx';
import Login from '../pages/Login.jsx';
import UserInfo from '../components/UserInfo.jsx';
import Toggler from './Toggler';

const Navbar = () => {
  const { isDark } = useSelector(state => state.themeReducer);

  return (
    <Router>
      <Header isDark={isDark}>
        <StyledLink $isDark={isDark} exact to="/">
          Build
        </StyledLink>
        <StyledLink $isDark={isDark} to="/mypage">
          MyDeck
        </StyledLink>
        <StyledLink $isDark={isDark} to="/profile">
          Search
        </StyledLink>
      </Header>
      <Aside>
        <Toggler />
        <UserInfo />
      </Aside>

      <Switch>
        <Route path="/mypage">
          <MyPage />
        </Route>
        <Route path="/profile">
          <HistorySearch />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
};

const Header = styled.header`
  height: 60px;
  font-size: 1rem;
  background-color: ${({ isDark }) => (isDark ? '#1e2027' : '#D5CABD')};
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 800px) {
    justify-content: flex-start;
  }
`;

const Aside = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
  display: flex;
  align-items: center;
  & > div {
    margin-right: 1rem;
  }
  height: 40px;
`;

const StyledLink = styled(NavLink)`
  font-size: 2rem;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: bold;
  color: white;
  align-content: center;
  margin: 0 1.2rem;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  &.active {
    color: ${({ $isDark }) => ($isDark ? '#009efa' : '#EF6C9C')};
  }
  @media (max-width: 800px) {
    margin: 0 0.8rem;
  }
`;

export default Navbar;
