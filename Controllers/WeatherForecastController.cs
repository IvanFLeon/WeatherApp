using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace WeatherApp.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class WeatherForecastController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;
    private readonly IWeatherApi _weatherApi;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, IWeatherApi weatherApi)
    {
        _weatherApi = weatherApi;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult> City(string name)
    {
        try {

          return Ok(await _weatherApi.GetWeatherByCity(name));
        }
        catch {
            return NotFound($"Couldn't find weather for city {name}");
        }
    }
    [HttpGet]
    public async Task<ActionResult> Zipcode(string zipcode, string countrycode)
    {
        try {
            return Ok(await _weatherApi.GetWeatherByZipcodeCountrycode(zipcode, countrycode));
        }
        catch {
            return NotFound($"Couldn't find weather for zipcode {zipcode} in {countrycode}");
        }
    }

    [HttpGet]
    public async Task<ActionResult> Location(string latitude, string longitude)
    {
        try {
            return Ok(await _weatherApi.GetWeatherByLocation(latitude, longitude));
        }
        catch {
            return NotFound($"Couldn't find weather for latitude {latitude} and longitude {longitude}");
        }
    }
}
