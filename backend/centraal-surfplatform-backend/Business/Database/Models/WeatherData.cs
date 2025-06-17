namespace Business.Database.Models;

public class WeatherData
{
    public int Id { get; set; }
    public DateTime FetchedAt { get; set; }
    public List<DateTime>? Time { get; set; }
    public List<double>? Temperature { get; set; }
    public List<double>? WindSpeed { get; set; }
    public List<double>? WindDirection { get; set; }
    public List<double>? WaveHeight { get; set; }
    public List<double>? WaveDirection { get; set; }
    public List<double>? WavePeriod { get; set; }
    public List<double>? WaterTemperature { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    
    public WeatherSnapshot? AtTime(DateTime targetTime)
    {
        if (Time == null || Time.Count == 0)
            return null;

        // Find the index of the closest time
        int closestIndex = 0;
        TimeSpan smallestDiff = TimeSpan.MaxValue;

        for (int i = 0; i < Time.Count; i++)
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
            Temperature = Temperature != null && Temperature.Count > closestIndex ? Temperature[closestIndex] : null,
            WindSpeed = WindSpeed != null && WindSpeed.Count > closestIndex ? WindSpeed[closestIndex] : null,
            WindDirection = WindDirection != null && WindDirection.Count > closestIndex ? WindDirection[closestIndex] : null,
            WaveHeight = WaveHeight != null && WaveHeight.Count > closestIndex ? WaveHeight[closestIndex] : null
        };
    }
}