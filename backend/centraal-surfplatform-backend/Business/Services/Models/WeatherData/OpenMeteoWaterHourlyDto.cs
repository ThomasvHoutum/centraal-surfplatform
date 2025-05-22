using System.Text.Json.Serialization;

namespace Business.Services.Models.WeatherData;

public class OpenMeteoWaterHourlyDto
{
    public List<string> Time { get; set; } = new();

    [JsonPropertyName("wave_height")]
    public List<double?> WaveHeight { get; set; } = new();

    [JsonPropertyName("wave_direction")]
    public List<double?> WaveDirection { get; set; } = new();

    [JsonPropertyName("wave_period")]
    public List<double?> WavePeriod { get; set; } = new();

    [JsonPropertyName("sea_surface_temperature")]
    public List<double?> SeaSurfaceTemperature { get; set; } = new();
}