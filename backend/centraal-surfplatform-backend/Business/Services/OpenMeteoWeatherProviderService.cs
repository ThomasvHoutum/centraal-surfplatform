using System.Text.Json;
using Business.Database.Models;
using Business.Services.Interfaces;
using Business.Services.Models.WeatherData;

namespace Business.Services;

public class OpenMeteoWeatherProviderService : IWeatherProviderService
{
    private readonly HttpClient _httpClient;

    public OpenMeteoWeatherProviderService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }
    
    public async Task<WeatherData> GetWeatherDataAsync(double latitude, double longitude)
    {
        var response = await 
            _httpClient.GetAsync(
                $"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&hourly=temperature_2m,wind_speed_10m,wind_direction_10m&models=knmi_seamless");
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();

        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        };
        
        var data = JsonSerializer.Deserialize<OpenMeteoResponseDto>(json, options);
        if (data == null)
        {
            throw new Exception("Invalid response from OpenMeteo API");
        }

        var weatherData = new WeatherData
        {
            Latitude = data.Latitude,
            Longitude = data.Longitude,
            Time = data.Hourly.Time.Select(DateTime.Parse).ToArray(),
            Temperature = data.Hourly.Temperature_2m,
            WindSpeed = data.Hourly.Wind_Speed_10m,
            WindDirection = data.Hourly.Wind_Direction_10m,
            WaveHeight = null
        };
        
        return weatherData;
    }
}