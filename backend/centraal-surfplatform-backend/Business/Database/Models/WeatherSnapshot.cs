namespace Business.Database.Models;

public class WeatherSnapshot
{
    public DateTime Time { get; set; }
    public double? Temperature { get; set; }
    public double? WindSpeed { get; set; }
    public double? WindDirection { get; set; }
    public double? WaveHeight { get; set; }
}