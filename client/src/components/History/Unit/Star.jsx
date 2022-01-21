import React from 'react';

function Star({ tier, rarity }) {
  // props로 별의 개수와 cost에 따라 색상 변경
  function colorRead() {
    if (rarity === 0) {
      return 'gray';
    } else if (rarity === 1) {
      return 'green';
    } else if (rarity === 2) {
      return 'blue';
    } else if (rarity === 3) {
      return 'purple';
    } else {
      return 'gold';
    }
  }
  if (tier === 1) {
    return <div style={{ color: colorRead() }}>★</div>;
  } else if (tier === 2) {
    return <div style={{ color: colorRead() }}>★★</div>;
  } else {
    return <div style={{ color: colorRead() }}>★★★</div>;
  }
}

export default Star;
