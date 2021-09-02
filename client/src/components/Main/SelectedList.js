import styled from 'styled-components';

import Slot from './Slot';

const SelectedList = ({ slots, handleDragEnter, handleSlotDragStart, handleSlotDragEnd }) => {
  const mappedSlots = slots.map((champion, idx) => (
    <Slot
      key={idx}
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
`;

export default SelectedList;
