import styled from "styled-components";
import svgToComponent from "../../utils/svgs";

const AuthButton = ({ name, authHandler }) => {
  const props = { width: 30, height: 30 };
  return (
    <LoginButton onClick={authHandler}>
      {svgToComponent({ svgName: `${name}Logo`, props })}
      <LoginText>Continue with {name}</LoginText>
    </LoginButton>
  );
};

const LoginButton = styled.div`
  height: 60px;
  margin: 1rem auto 0;
  padding: 1rem;
  border: 2px solid #afafaf;
  border-radius: 5px;
  display: flex;
  align-items: center;
  &:hover {
    border-color: #4d4d4d;
    cursor: pointer;
  }
`;

const LoginText = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: #474747;
`;

export default AuthButton;
