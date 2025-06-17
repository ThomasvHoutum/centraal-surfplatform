using System.Text.Json.Serialization;

namespace Business.Services.Models.WeatherData;

public class OpenMeteoHourlyDto
{
    public List<string> Time { get; set; } = [];
    [JsonPropertyName("temperature_2m")]
    public List<double>? Temperature_2m { get; set; } = [];
    [JsonPropertyName("wind_speed_10m")]
    public List<double>? Wind_Speed_10m { get; set; } = [];
    [JsonPropertyName("wind_direction_10m")]
    public List<double>? Wind_Direction_10m { get; set; } = [];
}