using Business.Database;
using Business.Database.Models;
using Business.Services.Interfaces;

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
        var data = await _weatherProviders["OpenMeteo"].GetWeatherDataAsync(latitude, longitude);
        
        _db.WeatherData.Add(data);
        await _db.SaveChangesAsync();
        
        return data;
    }
}