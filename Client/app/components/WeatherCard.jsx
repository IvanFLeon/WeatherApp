export default function WeatherCard(dailyWeather) {
  const {date, value, openCard} = dailyWeather;
  const formatDate = Intl.DateTimeFormat(undefined, {weekday: 'long'}).format(new Date(date));
  console.log(value)

  return (
    <div onClick={openCard} className="border rounded shadow w-60 p-5 mx-3 flex-shrink-0 snap-center cursor-pointer hover:bg-gray-100">
      <p className="font-semibold">{formatDate}</p>
      <p>{date}</p>
      <img src={value.hourlyWeather[0].icon} aria-label="Current weather condition icon" className="object-fill"/>
      <p className="font-semibold inline">Temperature </p><span>(Max/Min)</span>
      <div>
        {value.maxTemp}/{value.minTemp} °C
      </div>
    </div>
  )
}