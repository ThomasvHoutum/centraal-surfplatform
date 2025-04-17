using Business.Database.Models;

namespace Business.Services.Interfaces;

public interface IWeatherService
{
    Task<WeatherData> GetWeatherDataAsync(double latitude, double longitude);
}