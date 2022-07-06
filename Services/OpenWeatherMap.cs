using Microsoft.Extensions.Configuration;
public class OpenWeatherMap : IWeatherApi {
  private string baseUrl;
  private string apiKey;
  private HttpClient client;
  private readonly IConfiguration _configuration; 
  public OpenWeatherMap(IConfiguration configuration) {
    _configuration = configuration;
    baseUrl = _configuration["OpenWeatherMap:BaseUrl"];
    apiKey = _configuration["OpenWeatherMap:ApiKey"];
    client = new HttpClient();
  }
  public async Task<WeatherResponse> GetWeatherByCity(string city) {
    HttpResponseMessage response = await client.GetAsync($"{baseUrl}?q={city}&appid={apiKey}");
    response.EnsureSuccessStatusCode();
    return Convert(await response.Content.ReadFromJsonAsync<OpenWeatherResponse>());
  }
  public async Task<WeatherResponse> GetWeatherByZipcodeCountrycode(string zipcode, string countrycode) {
    HttpResponseMessage response = await client.GetAsync($"{baseUrl}?zip={zipcode},{countrycode}&appid={apiKey}");
    response.EnsureSuccessStatusCode();
    return Convert(await response.Content.ReadFromJsonAsync<OpenWeatherResponse>());
  }

  private WeatherResponse Convert(OpenWeatherResponse response) {
    WeatherResponse weatherResponse = new WeatherResponse();
    weatherResponse.HourlyWeathers = response.list.Select<Data, HourlyWeather>(d => new HourlyWeather {
      Description = d.weather[0].description,
      Icon = d.weather[0].icon,
      MaxTemp = d.main.temp_max,
      MinTemp = d.main.temp_min,
      Timestamp = d.dt
    }).ToList();

    weatherResponse.Location = new Location {
      City = response.city.name,
      Coordinates = new Coordinates {
        Latitude = response.city.coord.lat,
        Longitue = response.city.coord.lon
      }
    };

    return weatherResponse;
  }

  private class OpenWeatherResponse {
    public string cod { get; set; }
    public int message { get; set; } 

    public int cnt { get; set; }
    public List<Data> list { get; set; }
    public City city { get; set; }
  }
  
  private class Data {
    public long dt { get; set; } 
    public Main main { get; set; }
    public List<Weather> weather { get; set; }

  }

  private class Main {
    public float temp { get; set; }
    public float temp_min { get; set; }
    public float temp_max { get; set; }
  }

  private class Weather {
    public string description { get; set; }
    public string icon { get; set; }
  }
  private class City {
    public string name { get; set; }
    public Coord coord { get; set; }
  }
  private class Coord {
    public float lat { get; set; }
    public float lon { get; set; }
  }
}