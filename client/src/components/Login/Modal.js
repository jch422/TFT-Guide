import { useRef } from 'react';
import styled, { css } from 'styled-components';

import penguin from '../../images/tft-penguin2.png';

const Modal = ({ show, closeModal, submitHandler }) => {
  const inputRef = useRef();

  const getRiotId = () => inputRef.current.value.trim();
  const onClickSubmit = () => submitHandler(getRiotId());
  const onKeyPressEnter = ({ key }) => {
    if (key !== 'Enter') return;
    submitHandler(getRiotId());
  };

  return (
    <ModalContainer show={show}>
      <ModalContent show={show}>
        <CloseBtn onClick={closeModal}>&times;</CloseBtn>
        <ModalHeader>
          <ModalTitle>🥳 인증 성공 🎉</ModalTitle>
          <Img src={penguin} />
        </ModalHeader>
        <ModalBody>
          <Input
            ref={inputRef}
            placeholder="두 글자 이상의 소환사명을 입력해주세요"
            onKeyPress={onKeyPressEnter}
          ></Input>
          <SubmitBtn onClick={onClickSubmit}>확인</SubmitBtn>
        </ModalBody>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;

const fadeIn = `
  opacity: 1;
  pointer-events: visible;
`;
const fadeOut = `
  opacity: 0;
  pointer-events: none;
`;
const moveDownward = `
  transform: translateY(0);
`;
const moveUpward = `
  transform: translateY(-200px);
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  ${({ show }) =>
    show
      ? css`
          ${fadeIn}
        `
      : css`
          ${fadeOut}
        `}
`;

const ModalContent = styled.div`
  position: relative;
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #3a3f4c;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  ${({ show }) =>
    show
      ? css`
          ${moveDownward}
        `
      : css`
          ${moveUpward}
        `}
`;

const CloseBtn = styled.span`
  position: absolute;
  color: #ffffff;
  top: 0.3rem;
  right: 0.7rem;
  font-size: 32px;
  vertical-align: top;
  &:hover {
    cursor: pointer;
  }
`;

const ModalHeader = styled.div``;

const ModalTitle = styled.div`
  color: #ffffff;
  font-size: 32px;
  text-align: center;
`;

const Img = styled.img`
  margin-bottom: 0.5rem;
`;

const ModalBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Input = styled.input`
  width: 70%;
  height: 2.5rem;
  border: 1px solid transparent;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding-left: 0.5rem;
  &:focus {
    outline: none;
  }
`;

const SubmitBtn = styled.div`
  height: 2.5rem;
  padding: 0 1rem;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #00ab33;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
