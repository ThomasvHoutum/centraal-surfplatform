using Business.Database;
using Business.Database.Models;
using Business.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Business.Services;

public class WeatherService : IWeatherService
{
    private readonly DatabaseContext _db;
    private readonly Dictionary<string, IWeatherProviderService> _weatherProviders;

    public WeatherService(DatabaseContext db, Dictionary<string, IWeatherProviderService> weatherProviders)
    {
        _db = db;
        _weatherProviders = weatherProviders;
    }

    public async Task<WeatherData> GetWeatherDataAsync(double latitude, double longitude)
    {
        var cachedData = await GetCachedWeatherDataAsync(latitude, longitude);

        if (cachedData != null)
        {
            return cachedData;
        }

        var data = await _weatherProviders["OpenMeteo"].GetWeatherDataAsync(latitude, longitude);
        data.FetchedAt = DateTime.UtcNow;

        _db.WeatherData.Add(data);
        await _db.SaveChangesAsync();

        return data;
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