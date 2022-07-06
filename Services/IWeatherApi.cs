public interface IWeatherApi {
  Task<WeatherResponse> GetWeatherByCity(string city);
  Task<WeatherResponse> GetWeatherByZipcodeCountrycode(string zipcode, string countrycode);
}

public class WeatherResponse {
  public WeatherResponse() {
    HourlyWeathers = new List<HourlyWeather>();
    Location = new Location();
  }
  public List<HourlyWeather> HourlyWeathers { get; set; }
  public Location Location { get; set; }
}

public class HourlyWeather {
  public HourlyWeather() {
    Description = "";
    Icon = "";
  }
  public long Timestamp { get; set; }
  public float MinTemp { get; set; }
  public float MaxTemp { get; set; }
  public string Description { get; set; }
  public string Icon { get; set; }
}

public class Location {
  public Location () {
    City = "";
    Coordinates = new Coordinates();
  }
  public string City { get; set; }
  public Coordinates Coordinates { get; set; }
}

public class Coordinates {
  public float Latitude { get; set; }
  public float Longitue { get; set; }
}