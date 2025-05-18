using System.Text.Json.Serialization;

namespace Business.Services.Models.WeatherData;

public class OpenMeteoWaterHourlyDto
{
    public string[] Time { get; set; } = [];
        
    [JsonPropertyName("wave_height")]
    public double[]? WaveHeight { get; set; } = [];
    
    [JsonPropertyName("wave_direction")]
    public double[]? WaveDirection { get; set; } = [];
    
    [JsonPropertyName("wave_period")]
    public double[]? WavePeriod { get; set; } = [];

    [JsonPropertyName("sea_surface_temperature")]
    public double[]? SeaSurfaceTemperature { get; set; } = [];
}