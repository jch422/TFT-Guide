import GlobalStyle from './styles/GlobalStyles';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import { useState } from 'react';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import HistorySearch from './pages/HistorySearch';
import Login from './pages/Login';

function App() {
  const [current, setCurrent] = useState('main');

  return (
    <>
      <Navbar setCurrent={setCurrent} current={current} />
      <GlobalStyle />
      {current === 'main' && 'main'}
      {current === 'mypage' && <MyPage />}
      {current === 'search' && 'search'}
    </>
  );
}

export default App;
