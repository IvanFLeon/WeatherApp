import { fetch, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import WeatherCard from "../../components/WeatherCard";
import { Dialog } from "@reach/dialog";
import dialogStyles from "@reach/dialog/styles.css";
import { ClientOnly } from "remix-utils";
import Favorite from "../../components/Favorite.client";

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
  const search = url.searchParams.get("search");
  const timeZone = url.searchParams.get("timezone")
  //if (city) {
  //  const data = await fetch(`https://localhost:7175/WeatherForecast/City?name=${city}`)
  //}
  //else if (zipcode && countrycode) {
  //  const data = await fetch(`https://localhost:7175/WeatherForecast/Zipcode?zipcode=${zipcode}&count`)
  //}
  //if (data.ok) {
  //  console.log(await data.json())
  //}
  const res = await fetch(`https://localhost:7175/WeatherForecast/City?name=Mexicali`)
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
    throw new Error();
  }

}

export default function Weather() {
  const { data: {dailyWeather, location} } = useLoaderData();
  const [selectedCard, selectCard] = useState("");

  const WeatherCards = Object.entries(dailyWeather).map(([key, value]) => 
    <WeatherCard date={key} value={value} key={key} openCard={() => {
      selectCard(key)
    }}/>)

  const HourlyWeathers = dailyWeather[selectedCard]?.hourlyWeather.map(hw => 
    <HourlyWeather data={hw} key={hw.timestamp}/>)
  return (
    <div>
      <h1>{location.city}</h1>
      <ClientOnly>
        {() => <Favorite location={location}/>}
      </ClientOnly>
      {WeatherCards}
      <Dialog isOpen={!!selectedCard} onDismiss={() => selectCard("")}>
        <table>
          {HourlyWeathers}
        </table>
      </Dialog>
    </div>
  )
}

function HourlyWeather({ data }) {
  return (
    <tr>
      <td>
        {data.time}
      </td>
      <td>
        {data.minTemp}
      </td>
      <td>
        {data.maxTemp}
      </td>
      <td>
        {data.description}
      </td>
      <td>
        {data.icon}
      </td>
    </tr>
  )
}

