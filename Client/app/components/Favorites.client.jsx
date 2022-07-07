import { useNavigate } from "@remix-run/react";
import useFavorites from "../hooks/useFavorites"

export default function Favorites() {
  const { getAll } = useFavorites();
  const favorites = getAll();
  const FavoriteCards = Object.entries(favorites).map(([key, {city, coordinates}]) => 
    <FavoriteCard key={key} city={city} coordinates={coordinates}/>)
  return (
    <div>
    {FavoriteCards}
    </div>
  )
}

function FavoriteCard({city, coordinates}) {
  const {longitude, latitude} = coordinates;
  const navigate = useNavigate();

  function handleClick() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    navigate(`/weather?searchtype=location&q=${latitude},${longitude}&timezone=${timezone}`)
  }

  return (
    <div onClick={handleClick}>
      <div>
        <h3>{city}</h3>
      </div>
      <div>
        <div>
          Latitude: {latitude}
        </div>
        <div>
          Longitude: {longitude}
        </div>
      </div>
    </div>
  )
}