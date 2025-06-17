﻿using System.Net.Http.Json;
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
        var url = $"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&hourly=temperature_2m,wind_speed_10m,wind_direction_10m&models=knmi_seamless";

        var data = await _httpClient.GetFromJsonAsync<OpenMeteoResponseDto>(url, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        if (data == null)
            throw new Exception("Invalid response from OpenMeteo API");

        return new WeatherData
        {
            Latitude = data.Latitude,
            Longitude = data.Longitude,
            Time = data.Hourly.Time.Select(DateTime.Parse).ToList(),
            Temperature = data.Hourly.Temperature_2m,
            WindSpeed = data.Hourly.Wind_Speed_10m,
            WindDirection = data.Hourly.Wind_Direction_10m
        };
    }

}