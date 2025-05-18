using System.Net.Http.Json;
using System.Text.Json;
using Business.Database.Models;
using Business.Services.Interfaces;
using Business.Services.Models.WeatherData;

namespace Business.Services;

public class OpenMeteoWaterProviderService : IWeatherProviderService
{
    private readonly HttpClient _httpClient;

    public OpenMeteoWaterProviderService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }
    
    public async Task<WeatherData> GetWeatherDataAsync(double latitude, double longitude)
    {
        var url = $"https://marine-api.open-meteo.com/v1/marine?latitude={latitude}&longitude={longitude}&hourly=wave_height,sea_surface_temperature,wave_direction,wave_period";

        var data = await _httpClient.GetFromJsonAsync<OpenMeteoWaterResponseDto>(url, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        if (data == null)
            throw new Exception("Invalid response from OpenMeteo Marine API");

        return new WeatherData
        {
            Latitude = data.Latitude,
            Longitude = data.Longitude,
            Time = data.Hourly.Time.Select(DateTime.Parse).ToArray(),
            WaveHeight = data.Hourly.WaveHeight,
            WaveDirection = data.Hourly.WaveDirection,
            WavePeriod = data.Hourly.WaveDirection,
            WaterTemperature = data.Hourly.SeaSurfaceTemperature
        };
    }
}