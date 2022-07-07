import { useRef, useState } from "react";
import useFavorites from "../hooks/useFavorites";

export default function Favorite({location}) {
  const checkboxRef = useRef();
  const favorites = useFavorites();
  const [isFavorite, setIsFavorite] = useState(!!favorites.get(location));

  function onToggle() {
    checkboxRef.current.checked = !checkboxRef.current.checked;
    if (!checkboxRef.current.checked) favorites.remove(location);
    else favorites.set(location);
    setIsFavorite(!!favorites.get(location))
  }

  var toggleColor = isFavorite ? 'text-yellow-400' : 'text-black';

  return (
    <div>
      <p onClick={onToggle} className={`pl-1 text-6xl hover:opacity-70 drop-shadow cursor-pointer ${toggleColor}`}>★</p>
      <div className="hidden">
        <input ref={checkboxRef} type='checkbox' checked={isFavorite}></input>
        <label>Favorite</label>
      </div>
    </div>
  );
}