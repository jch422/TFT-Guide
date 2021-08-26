import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import AuthButton from '../components/Login/AuthButton';
import Modal from '../components/Login/Modal';

const Login = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const accessToken = extractAccessTokenFromURL();
    if (accessToken) {
      getUserInfo(accessToken);
    }
  }, []);

  const extractAccessTokenFromURL = () => {
    const url = new URL(window.location.href);
    const hashString = url.hash.slice(1);
    const hashFragments = hashString.split('&');

    for (const hashFragment of hashFragments) {
      if (hashFragment.startsWith('access_token')) {
        const accessToken = hashFragment.split('=')[1];
        return accessToken;
      }
    }
  };

  const getUserInfo = async accessToken => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URI}/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserInfo(data);
      setModalShow(true);
    } catch (err) {
      //TODO: userInfo 불러오기 오류 --> 페이지 라우터 적용 후, 메인 페이지로 이동하도록 구현할 예정
    }
  };

  const makeGoogleOAuthRequestURL = () => {
    let requestURL = `${process.env.REACT_APP_OAUTH2ENDPOINT}?`;
    requestURL += `client_id=${process.env.REACT_APP_CLIENT_ID}&`;
    requestURL += `redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&`;
    requestURL += `response_type=token&`;
    requestURL += `scope=${process.env.REACT_APP_SCOPE}`;
    return requestURL;
  };

  const authHandler = async () => {
    const requestURL = makeGoogleOAuthRequestURL();
    window.location.assign(requestURL);
  };

  const submitHandler = riotId => {
    if (riotId.length < 2) {
      return alert('소환사명을 입력해주세요🧐');
    }
    setModalShow(false);
    setUserInfo(userInfo => ({ ...userInfo, riot_id: riotId }));
  };

  const authMethods = [
    {
      name: 'Google',
      authHandler,
    },
    {
      name: 'Kakao',
      authHandler: () => alert('개발중인 서비스입니다.'),
    },
    {
      name: 'Facebook',
      authHandler: () => alert('개발중인 서비스입니다.'),
    },
  ];

  return (
    <LoginContainer>
      <Title>소셜 로그인</Title>
      <Greet>Welcome to TFT Guide!</Greet>
      {authMethods.map(authMethod => (
        <AuthButton key={authMethod.name} {...authMethod} />
      ))}
      <Modal
        show={modalShow}
        closeModal={() => setModalShow(false)}
        submitHandler={submitHandler}
      />
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  width: 600px;
  height: 100vh;
  overflow: auto;
  margin: 0 auto;
  padding: 0 2rem;
  border: 1px solid #b5b5b5;
  border-radius: 10px;
  background-color: #fefefe;
`;

const Title = styled.div`
  font-size: 24px;
  text-align: center;
  color: #444444;
  margin: 3rem 0;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e3e3e3;
`;

const Greet = styled.div`
  font-size: 28px;
  color: #444444;
  margin-bottom: 3rem;
`;
