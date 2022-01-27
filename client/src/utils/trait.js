import traits from '../JSON/traits.json';

const traitMapper = traits.reduce((acc, cur) => {
  acc[cur.key] = cur.kr_name;
  return acc;
}, {});

export default traitMapper;
