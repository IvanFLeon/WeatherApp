export default function useFavorites() {
  const getKey = (item) => `F.${item.coordinates.latitude}.${item.coordinates.longitude}`;

  const favorites = {
    set: (item) => {
      localStorage.setItem(getKey(item), JSON.stringify(item));
    },
    remove: (item) => {
      localStorage.removeItem(getKey(item));
    },
    get: (item) => {
      return JSON.parse(localStorage.getItem(getKey(item)));
    },
    getAll: () => {
      const ls =  {...localStorage};
      Object.keys(ls).forEach(k => {
        if(!k.match('F.*'))
          delete ls[k];
        else
          ls[k] = JSON.parse(ls[k])
      });

      return ls;
    }
  } 

  return favorites;
}