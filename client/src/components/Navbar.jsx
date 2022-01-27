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
        <StyledLink exact to="/">
          Build
        </StyledLink>
        <StyledLink to="/mypage">MyDeck</StyledLink>
        <StyledLink to="/profile">Search</StyledLink>
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
  background-color: ${({ isDark }) => (isDark ? '#1e2027' : '#0d2e41')};
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
  font-family: Impact;
  color: #fbed0b;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000,
    4px 2px 0px #00f0ff, 8px 4px 0px #80ff02;
  padding: 1rem;
  align-content: center;
  &:hover {
    color: #dc44c3;
    cursor: pointer;
  }
  &.active {
    color: #dc44c3;
  }
`;

export default Navbar;
