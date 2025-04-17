namespace Business.Services.Models.WeatherData;

public class OpenMeteoResponseDto
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public OpenMeteoHourlyDto Hourly { get; set; } = new();
}