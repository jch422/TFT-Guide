export const REMOVE_ZONE = -1;
export const EMPTY_SLOT = {
  name: '',
  kr_name: '',
  championId: '',
  cost: 0,
  traits: [],
};
export const costColorMapper = {
  1: '#808080',
  2: '#11b288',
  3: '#207ac7',
  4: '#c440da',
  5: '#ffb93b',
};
export const rankColorMapper = rank => {
  switch (rank) {
    case 1:
      return '#11b288';
    case 2:
    case 3:
    case 4:
      return '#207ac7';
    default:
      return '#a0a0a0';
  }
};
