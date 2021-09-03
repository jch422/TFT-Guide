import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { resetUserInfo } from '../actions';

const UserInfo = () => {
  const { picture, email, riotId } = useSelector(state => state.userInfoReducer);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const handleUserInfoClick = () => {
    setModalShow(!modalShow);
  };

  const handleLogout = () => {
    dispatch(resetUserInfo());
  };

  return (
    <UserInfoContainer onClick={handleUserInfoClick}>
      {email ? (
        <>
          <ImgWrapper>
            <Img src={picture} />
          </ImgWrapper>
          {modalShow && (
            <LogoutModal>
              <UserInfoWrapper>
                <Img src={picture} />
                <RiotId>{riotId ? riotId : '소환사명 미등록'}</RiotId>
                <Email>{email}</Email>
              </UserInfoWrapper>
              <Hr />
              <LogoutBtnWrapper>
                <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
              </LogoutBtnWrapper>
            </LogoutModal>
          )}
        </>
      ) : (
        <StyledLink to="/login">Login</StyledLink>
      )}
    </UserInfoContainer>
  );
};

const UserInfoContainer = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  max-width: 4rem;
`;

const ImgWrapper = styled.div`
  width: 15vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Img = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid #fff;
  border-radius: 50%;
  margin-right: 0.3rem;
`;

const Email = styled.div`
  color: yellow;
  font-size: 1rem;
`;

const StyledLink = styled(Link)`
  color: white;
  font-size: 1.2rem;
  &:hover {
    color: yellow;
  }
`;

const LogoutBtn = styled.div`
  color: #3c4043;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.5rem 1rem;
`;

const LogoutModal = styled.div`
  position: absolute;
  right: 0;
  top: 3rem;
  min-width: 15rem;
  background-color: #fff;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 20%);
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & ${Img} {
    width: 5rem;
    height: 5rem;
  }
  & ${Email} {
    color: #5f6368;
  }
  > * {
    margin-top: 1rem;
    &:last-child {
      margin-top: 0.3rem;
      margin-bottom: 1rem;
    }
  }
`;

const RiotId = styled.div`
  color: #202124;
  font-size: 1.2rem;
`;

const LogoutBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.8rem 0;
`;

const Hr = styled.div`
  border-top: 1px solid #ccc;
  width: 100%;
`;

export default UserInfo;
