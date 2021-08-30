import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

import MainPage from '../pages/MainPage';
import MyPage from '../pages/MyPage';
import HistorySearch from '../pages/HistorySearch';
import Login from '../pages/Login';
import UserInfo from '../components/UserInfo';

const Navbar = () => {
  return (
    <Router>
      <Header>
        <StyledLink to="/">Main</StyledLink>
        <StyledLink to="/mypage">MyPage</StyledLink>
        <StyledLink to="/profile">Search</StyledLink>
        <UserInfo />
      </Header>

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
  height: 5vh;
  font-size: 5vh;
  align-items: center;
  background-color: #0d2e41;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  font-size: 4vh;
  font-family: Impact;
  color: #fbed0b;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000,
    4px 2px 0px #00f0ff, 8px 4px 0px #80ff02;
  padding: 1vh;
  align-content: center;
  &:hover {
    color: #dc44c3;
    cursor: pointer;
  }
`;

export default Navbar;
