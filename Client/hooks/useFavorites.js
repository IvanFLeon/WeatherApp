export default function useFavorites() {
  const getKey = (item) => `F.${item.city}.${item.coordinates.latitude}.${item.coordinates.longitude}`;

  const favorites = {
    set: (item) => {
      localStorage.setItem(getKey(item), JSON.stringify(item));
    },
    remove: (item) => {
      localStorage.removeItem(getKey(item));
    },
    get: (item) => {
      return JSON.parse(localStorage.getItem(getKey(item)));
    }
  } 

  return favorites;
}