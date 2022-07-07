using Xunit;
using Moq;
using WeatherApp.Controllers;
using Microsoft.AspNetCore.Mvc;

public class WeatherForecastControllerTests {
  
  [Fact]
  public async Task CityReturnsOkResult() {
    var city = "Mexicali";
    var response = new WeatherResponse();

    var mockWeatherApi = new Mock<IWeatherApi>();
    mockWeatherApi.Setup(api => api.GetWeatherByCity(city)).ReturnsAsync(response);
    var mockLogger = new Mock<ILogger<WeatherForecastController>>();
    var weatherForecastController = new WeatherForecastController(mockLogger.Object, mockWeatherApi.Object);
    var res = await weatherForecastController.City(city);

    Assert.IsType<OkObjectResult>(res as OkObjectResult);
  }

  [Fact]
  public async Task CityReturnsNotFoundResult() {
    var city = "Mexicali";
    var mockWeatherApi = new Mock<IWeatherApi>();
    mockWeatherApi.Setup(api => api.GetWeatherByCity(city)).Throws(new Exception());
    var mockLogger = new Mock<ILogger<WeatherForecastController>>();
    var weatherForecastController = new WeatherForecastController(mockLogger.Object, mockWeatherApi.Object);
    var res = await weatherForecastController.City(city);

    Assert.IsType<NotFoundObjectResult>(res as NotFoundObjectResult);
  }
  public async Task ZipCodeReturnsOkResult() {
    var zipcode = "91020";
    var countrycode = "US";
    var response = new WeatherResponse();

    var mockWeatherApi = new Mock<IWeatherApi>();
    mockWeatherApi.Setup(api => api.GetWeatherByZipcodeCountrycode(zipcode, countrycode)).ReturnsAsync(response);
    var mockLogger = new Mock<ILogger<WeatherForecastController>>();
    var weatherForecastController = new WeatherForecastController(mockLogger.Object, mockWeatherApi.Object);
    var res = await weatherForecastController.Zipcode(zipcode, countrycode);

    Assert.IsType<OkObjectResult>(res as OkObjectResult);
  }

  [Fact]
  public async Task ZipCodeReturnsNotFoundResult() {
    var zipcode = "91020";
    var countrycode = "US";
    var mockWeatherApi = new Mock<IWeatherApi>();
    mockWeatherApi.Setup(api => api.GetWeatherByZipcodeCountrycode(zipcode, countrycode)).Throws(new Exception());
    var mockLogger = new Mock<ILogger<WeatherForecastController>>();
    var weatherForecastController = new WeatherForecastController(mockLogger.Object, mockWeatherApi.Object);
    var res = await weatherForecastController.Zipcode(zipcode, countrycode);

    Assert.IsType<NotFoundObjectResult>(res as NotFoundObjectResult);
  }
  public async Task LocationReturnsOkResult() {
    var latitude = "102.29";
    var longitude = "203.33";
    var response = new WeatherResponse();

    var mockWeatherApi = new Mock<IWeatherApi>();
    mockWeatherApi.Setup(api => api.GetWeatherByLocation(latitude, longitude)).ReturnsAsync(response);
    var mockLogger = new Mock<ILogger<WeatherForecastController>>();
    var weatherForecastController = new WeatherForecastController(mockLogger.Object, mockWeatherApi.Object);
    var res = await weatherForecastController.Location(latitude, longitude);

    Assert.IsType<OkObjectResult>(res as OkObjectResult);
  }

  [Fact]
  public async Task LocationReturnsNotFoundResult() {
    var latitude = "102.29";
    var longitude = "203.33";
    var mockWeatherApi = new Mock<IWeatherApi>();
    mockWeatherApi.Setup(api => api.GetWeatherByLocation(latitude, longitude)).Throws(new Exception());
    var mockLogger = new Mock<ILogger<WeatherForecastController>>();
    var weatherForecastController = new WeatherForecastController(mockLogger.Object, mockWeatherApi.Object);
    var res = await weatherForecastController.Location(latitude, longitude);

    Assert.IsType<NotFoundObjectResult>(res as NotFoundObjectResult);
  }
}