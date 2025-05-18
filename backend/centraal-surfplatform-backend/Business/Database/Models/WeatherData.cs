namespace Business.Database.Models;

public class WeatherData
{
    public int Id { get; set; }
    public DateTime FetchedAt { get; set; }
    public DateTime[]? Time { get; set; }
    public double[]? Temperature { get; set; }
    public double[]? WindSpeed { get; set; }
    public double[]? WindDirection { get; set; }
    public double[]? WaveHeight { get; set; }
    public double[]? WaveDirection { get; set; }
    public double[]? WavePeriod { get; set; }
    public double[]? WaterTemperature { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    
    public WeatherSnapshot? AtTime(DateTime targetTime)
    {
        if (Time == null || Time.Length == 0)
            return null;

        // Find the index of the closest time
        int closestIndex = 0;
        TimeSpan smallestDiff = TimeSpan.MaxValue;

        for (int i = 0; i < Time.Length; i++)
        {
            var diff = (Time[i] - targetTime).Duration();
            if (diff < smallestDiff)
            {
                smallestDiff = diff;
                closestIndex = i;
            }
        }

        return new WeatherSnapshot
        {
            Time = Time[closestIndex],
            Temperature = Temperature != null && Temperature.Length > closestIndex ? Temperature[closestIndex] : null,
            WindSpeed = WindSpeed != null && WindSpeed.Length > closestIndex ? WindSpeed[closestIndex] : null,
            WindDirection = WindDirection != null && WindDirection.Length > closestIndex ? WindDirection[closestIndex] : null,
            WaveHeight = WaveHeight != null && WaveHeight.Length > closestIndex ? WaveHeight[closestIndex] : null
        };
    }
}