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
            Time = data.Hourly.Time.Select(DateTime.Parse).ToList(),
            WaveHeight = data.Hourly.WaveHeight.TrueForAll(x => x == null) 
                ? null 
                : data.Hourly.WaveHeight.Select(x => x ?? 0).ToList(),
            WaveDirection = data.Hourly.WaveDirection.TrueForAll(x => x == null) 
                ? null 
                : data.Hourly.WaveDirection.Select(x => x ?? 0).ToList(),
            WavePeriod = data.Hourly.WavePeriod.TrueForAll(x => x == null) 
                ? null 
                : data.Hourly.WavePeriod.Select(x => x ?? 0).ToList(),
            WaterTemperature = data.Hourly.SeaSurfaceTemperature.TrueForAll(x => x == null) 
                ? null 
                : data.Hourly.SeaSurfaceTemperature.Select(x => x ?? 0).ToList()
        };

    }

}