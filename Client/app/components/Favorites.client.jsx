import { useNavigate } from "@remix-run/react";
import useFavorites from "../hooks/useFavorites"

export default function Favorites() {
  const { getAll } = useFavorites();
  const favorites = getAll();
  const FavoriteCards = Object.entries(favorites).map(([key, {city, coordinates}]) => 
    <FavoriteCard key={key} city={city} coordinates={coordinates}/>)
  return (
    <div className="container mx-auto flex flex-wrap pt-5 px-5">
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
    <div onClick={handleClick} className="border rounded p-5 flex-grow mx-3 my-2 shadow hover:bg-gray-100">
      <div>
        <h3 className="text-lg font-semibold">{city}</h3>
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