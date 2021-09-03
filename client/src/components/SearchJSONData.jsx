import champions from '../JSON/champions.json';
import items from '../JSON/items.json';
import traits from '../JSON/traits.json';

export function SearchJSONData(category, id) {
  if (category === 'traits') {
    for (let i = 0; i < Object.keys(traits).length; i++) {
      if (traits[i].key === id) {
        return traits[i];
      }
    }
  } else if (category === 'champions') {
    for (let i = 0; i < Object.keys(champions).length; i++) {
      if (champions[i].championId === id) {
        return champions[i];
      }
    }
  } else {
    for (let i = 0; i < Object.keys(items).length; i++) {
      if (items[i].id === id) {
        return items[i];
      }
    }
  }
}
