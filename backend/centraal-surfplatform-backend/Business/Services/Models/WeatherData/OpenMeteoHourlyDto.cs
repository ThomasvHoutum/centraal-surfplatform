using System.Text.Json.Serialization;

namespace Business.Services.Models.WeatherData;

public class OpenMeteoHourlyDto
{
    public string[] Time { get; set; } = Array.Empty<string>();
    [JsonPropertyName("temperature_2m")]
    public double[]? Temperature_2m { get; set; } = Array.Empty<double>();
    [JsonPropertyName("wind_speed_10m")]
    public double[]? Wind_Speed_10m { get; set; } = Array.Empty<double>();
    [JsonPropertyName("wind_direction_10m")]
    public double[]? Wind_Direction_10m { get; set; } = Array.Empty<double>();
}