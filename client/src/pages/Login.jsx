import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { updateUserInfo } from '../actions';
import AuthButton from '../components/Login/AuthButton';
import Modal from '../components/Login/Modal';
import { makeGoogleOAuthRequestURL } from '../utils/url';

const Login = () => {
  const userInfo = useSelector(state => state.userInfoReducer);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const getUserInfo = async accessToken => {
      try {
        const {
          data: {
            data: { id, email, picture, riotId, isRegistered },
            message,
          },
        } = await axios.get(`${process.env.REACT_APP_SERVER_URI}/users/login`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (message !== 'ok') {
          throw Error('invalid acessToken');
        }

        dispatch(updateUserInfo({ id, email, picture, riotId, isRegistered }));
        if (!isRegistered || !riotId) {
          setModalShow(true);
        } else {
          history.push('/');
        }
      } catch (err) {
        history.push('/login');
      }
    };
    const accessToken = extractAccessTokenFromURL();
    if (accessToken) {
      dispatch(updateUserInfo({ accessToken }));
      getUserInfo(accessToken);
    }
  }, [dispatch, history]);

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

  const authHandler = async () => {
    const requestURL = makeGoogleOAuthRequestURL();
    window.location.assign(requestURL);
  };

  const closeModalHandler = () => {
    const EMPTY_RIOT_ID = '';
    submitHandler(EMPTY_RIOT_ID);
  };

  const submitHandler = async riotId => {
    try {
      const {
        data: {
          data: { id },
          message,
        },
      } = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/users`,
        {
          riotId,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        },
      );

      if (message !== 'ok') {
        throw Error('register failed');
      }

      setModalShow(false);
      dispatch(updateUserInfo({ id, riotId }));
      history.push('/');
    } catch (err) {
      alert('소환사명 등록 중 오류 발생!');
      history.push('/');
    }
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
      <Modal show={modalShow} closeModal={closeModalHandler} submitHandler={submitHandler} />
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  width: 600px;
  height: 100%;
  overflow: auto;
  margin: 2rem auto;
  padding: 0 2rem 6rem;
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
