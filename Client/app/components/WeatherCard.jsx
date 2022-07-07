export default function WeatherCard(dailyWeather) {
  const {date, value, openCard} = dailyWeather;

  return (
    <div onClick={openCard}>
      <div>
        {date}
      </div>
      <div>
        {value.maxTemp}
      </div>
      <div>
        {value.minTemp}
      </div>
    </div>
  )
}