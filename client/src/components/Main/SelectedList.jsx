import styled from 'styled-components';

import Slot from './Slot.jsx';

const SelectedList = ({
  slots,
  isDark,
  handleDragEnter,
  handleSlotDragStart,
  handleSlotDragEnd,
}) => {
  const mappedSlots = slots.map((champion, idx) => (
    <Slot
      key={idx}
      isDark={isDark}
      {...champion}
      handleDragEnter={e => handleDragEnter(e, idx)}
      handleSlotDragStart={e => handleSlotDragStart(e, idx)}
      handleSlotDragEnd={handleSlotDragEnd}
    />
  ));

  return <SelectedContainer>{mappedSlots}</SelectedContainer>;
};

const SelectedContainer = styled.div`
  display: flex;
  & > *:nth-child(even) {
    margin-top: 122px;
    margin-left: -45px;
  }
  & > *:nth-child(odd) {
    margin-left: -45px;
  }
  @media (max-width: 1200px) {
    & > *:nth-child(even) {
      margin-top: 61px;
      margin-left: -23px;
    }
    & > *:nth-child(odd) {
      margin-left: -23px;
    }
  }
`;

export default SelectedList;
