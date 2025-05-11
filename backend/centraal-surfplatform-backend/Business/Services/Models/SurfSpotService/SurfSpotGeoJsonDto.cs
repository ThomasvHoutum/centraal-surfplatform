namespace Business.Services.Models.SurfSpotService;

public class SurfSpotGeoJsonDto
{
    public string Type { get; set; }
    public List<GeoJsonFeature> Features { get; set; }
}

public class GeoJsonFeature
{
    public string Type { get; set; }
    public Geometry Geometry { get; set; }
    public Properties Properties { get; set; }
}

public class Geometry
{
    public string Type { get; set; }
    public List<double> Coordinates { get; set; }  // [longitude, latitude]
}

public class Properties
{
    public string MarkerName { get; set; }
    public string Icon { get; set; }
    public string Address { get; set; }
    public string Text { get; set; }
}
