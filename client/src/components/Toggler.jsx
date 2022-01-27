import { useDispatch, useSelector } from 'react-redux';
import { toggleMode } from '../actions';
import svgToComponent from '../utils/svgs';
import styled from 'styled-components';

const Toggler = () => {
  const { isDark } = useSelector(state => state.themeReducer);

  const props = { width: 30, height: 30 };
  const dispatch = useDispatch();
  const handleToggle = () => {
    localStorage.setItem('isDark', JSON.stringify(!isDark));
    dispatch(toggleMode());
  };

  return (
    <TogglerContainer>
      <ToggleIcon onClick={handleToggle}>
        {svgToComponent({ svgName: isDark ? 'light' : 'night', props })}
      </ToggleIcon>
    </TogglerContainer>
  );
};

const TogglerContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleIcon = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export default Toggler;
