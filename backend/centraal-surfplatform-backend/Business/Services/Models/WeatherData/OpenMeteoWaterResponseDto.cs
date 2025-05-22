namespace Business.Services.Models.WeatherData;

public class OpenMeteoWaterResponseDto
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public OpenMeteoWaterHourlyDto Hourly { get; set; } = new();
}