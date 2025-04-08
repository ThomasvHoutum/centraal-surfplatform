using Business.Database.Models;

namespace Business.Services.Interfaces;

public interface IWeatherProviderService
{
    Task<WeatherData> GetWeatherDataAsync(double latitude, double longitude);
}