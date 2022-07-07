import { fetch, json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import WeatherCard from "../components/WeatherCard";
import { Dialog } from "@reach/dialog";
import dialogStyles from "@reach/dialog/styles.css";
import { useHydrated } from "remix-utils";
import Favorite from "../components/Favorite.client";

export function links() {
  return [{rel: "stylesheet", href: dialogStyles}]
}

export async function loader({request}) {
  function groupBy(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const url = new URL(request.url);
  const searchtype = url.searchParams.get("searchtype");
  const query = url.searchParams.get('q');
  const timeZone = url.searchParams.get("timezone") ?? Intl.DateTimeFormat().resolvedOptions().timeZone;

  var res;
  switch(searchtype) {
    case 'city':
      res = await fetch(`https://localhost:7175/WeatherForecast/City?name=${query}`);
      break;
    case 'zipcode':
      const [zipcode, countrycode] = query.split(',');
      res = await fetch(`https://localhost:7175/WeatherForecast/Zipcode?zipcode=${zipcode}&countrycode=${countrycode}`);
      break;
    case 'location':
      const [latitude,longitude] = query.split(',');
      res = await fetch(`https://localhost:7175/WeatherForecast/Location?latitude=${latitude}&longitude=${longitude}`);
      break;
    default:
      throw new Error("Invalid searchtype please use one of the following: city, zipcode, location");
  }

  if (res.ok) {
    const weatherData = await res.json();

    //Convert timpestamp to locale date and time and group
    const dailyWeather = groupBy(weatherData.hourlyWeathers.map(hw => ({
      date: new Date(hw.timestamp * 1000).toLocaleDateString('en-US', {timeZone}),
      time: new Date(hw.timestamp * 1000).toLocaleTimeString('en-US', {timeZone}),
      ...hw
    })), 'date')

    for (var [key, value] of Object.entries(dailyWeather)) {
      var maxTemp = value[0].maxTemp, minTemp = value[0].minTemp;
      for (var v of value) {
        if (v.maxTemp > maxTemp) maxTemp = v.maxTemp;
        if (v.minTemp < minTemp) minTemp = v.minTemp;
      }
      dailyWeather[key] = {
        hourlyWeather:  value,
        maxTemp,
        minTemp
      }
    }

    return json({data: { dailyWeather, location: weatherData.location}})
  }
  else {
    throw json({message: "Couldn't load the weather location you were looking for :("}, {status: 404});
  }

}

export default function Weather() {
  const { data: {dailyWeather, location} } = useLoaderData();
  const [selectedCard, selectCard] = useState("");
  const isHydrated = useHydrated();

  const WeatherCards = Object.entries(dailyWeather).map(([key, value]) => 
    <WeatherCard date={key} value={value} key={key} openCard={() => {
      selectCard(key)
    }}/>)

  const HourlyWeathers = dailyWeather[selectedCard]?.hourlyWeather.map(hw => 
      <HourlyWeather data={hw} key={hw.timestamp}/>)

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <h1 className="text-5xl text-center py-10 inline">{location.city}</h1>
        {isHydrated && <Favorite location={location} key={location.city} />}
      </div>
      <div className="flex overflow-auto cursor-grab snap-x container">
        {WeatherCards}
      </div>
      <Dialog style={{'width': '80%'}} aria-label="Day weather information" isOpen={!!selectedCard} onDismiss={() => selectCard("")}>
        <h3 className="text-2xl">Hourly weather {selectedCard}</h3>
        <div className="flex flex-col items-center items-stretch">
          {HourlyWeathers}
        </div>
      </Dialog>
    </div>
  )
}

function HourlyWeather({ data }) {
  return (
    <div className="border-b py-3 flex flex-wrap justify-between items-center">
      <div className="pr-4 w-40">
        {data.time}
      </div>
      <div className="pr-4 w-64">
        Temp (Max/Min): {data.maxTemp}/{data.minTemp} °C
      </div>
      <div className="pl-4">
        <img class="object-contain w-20" src={data.icon} alt="Weather condition icon"/>
      </div>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <h2>{caught.data.message}</h2>
  )
}