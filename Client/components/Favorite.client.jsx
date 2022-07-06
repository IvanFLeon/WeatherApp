import { useState } from "react";
import useFavorites from "../hooks/useFavorites";

export default function Favorite({location}) {
  const favorites = useFavorites();
  const [isFavorite, setIsFavorite] = useState(!!favorites.get(location));

  function handleFavorite(e) {
    if(!e.target.checked) favorites.remove(location);
    else favorites.set(location);
    setIsFavorite(!!favorites.get(location));
  }

  return (
    <div>
      <input type='checkbox' checked={isFavorite} onChange={handleFavorite}></input>
      <label>Favorite</label>
    </div>
  );
}