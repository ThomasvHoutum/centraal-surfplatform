namespace Business.Database.Models;

public class WeatherData
{
    public int Id { get; set; }
    public DateTime[]? Time { get; set; }
    public double[]? Temperature { get; set; }
    public double[]? WindSpeed { get; set; }
    public double[]? WindDirection { get; set; }
    public double[]? WaveHeight { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
}