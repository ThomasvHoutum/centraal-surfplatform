using Business.Database;
using Business.Database.Models;
using Business.Database.Models.Enums;
using Business.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Business.Services;

public class WeatherService : IWeatherService
{
    private readonly DatabaseContext _db;
    private readonly Dictionary<WeatherProvider, IWeatherProviderService> _weatherProviders;

    public WeatherService(DatabaseContext db, Dictionary<WeatherProvider, IWeatherProviderService> weatherProviders)
    {
        _db = db;
        _weatherProviders = weatherProviders;
    }

    public async Task<WeatherData> GetWeatherDataAsync(double latitude, double longitude)
    {
        var cachedData = await GetCachedWeatherDataAsync(latitude, longitude);
        if (cachedData != null)
            return cachedData;

        var weatherTask = _weatherProviders[WeatherProvider.OpenMeteoWeather].GetWeatherDataAsync(latitude, longitude);
        var marineTask = _weatherProviders[WeatherProvider.OpenMeteoWater].GetWeatherDataAsync(latitude, longitude);

        await Task.WhenAll(weatherTask, marineTask);

        var weather = weatherTask.Result;
        var marine = marineTask.Result;

        var combined = new WeatherData
        {
            Latitude = weather.Latitude,
            Longitude = weather.Longitude,
            Time = weather.Time,
            Temperature = weather.Temperature,
            WindSpeed = weather.WindSpeed,
            WindDirection = weather.WindDirection,
            WaveHeight = marine.WaveHeight,
            WaveDirection = marine.WaveDirection,
            WavePeriod = marine.WavePeriod,
            WaterTemperature = marine.WaterTemperature,
            FetchedAt = DateTime.UtcNow
        };

        _db.WeatherData.Add(combined);
        await _db.SaveChangesAsync();

        return combined;
    }

    private async Task<WeatherData?> GetCachedWeatherDataAsync(double latitude, double longitude)
    {
        var oneHourAgo = DateTime.UtcNow.AddHours(-1);

        double latDelta = 2.0 / 111.0;
        double lonDelta = 2.0 / (111.0 * Math.Cos(latitude * Math.PI / 180.0));

        double minLat = latitude - latDelta;
        double maxLat = latitude + latDelta;
        double minLon = longitude - lonDelta;
        double maxLon = longitude + lonDelta;

        return await _db.WeatherData
            .Where(w => w.FetchedAt >= oneHourAgo &&
                        w.Latitude >= minLat && w.Latitude <= maxLat &&
                        w.Longitude >= minLon && w.Longitude <= maxLon)
            .FirstOrDefaultAsync();
    }
}