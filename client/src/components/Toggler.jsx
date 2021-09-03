import { useDispatch, useSelector } from 'react-redux';
import { toggleMode } from '../actions';
import styled from 'styled-components';

const Toggler = () => {
  const { isDark } = useSelector(state => state.themeReducer);

  const dispatch = useDispatch();
  const handleToggle = () => {
    localStorage.setItem('isDark', JSON.stringify(!isDark));
    dispatch(toggleMode());
  };

  return (
    <TogglerContainer>
      <CheckBoxWrapper>
        <CheckBox id="checkbox" type="checkbox" onClick={handleToggle} />
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper>
    </TogglerContainer>
  );
};

const TogglerContainer = styled.div`
  margin-right: 4rem;
  z-index: 5;
`;

const CheckBoxWrapper = styled.div`
  position: relative;
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 3px;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

export default Toggler;
