using System.ComponentModel.DataAnnotations;

namespace Business.Services.Models.SurfSpotService;

public class UpdateSurfSpotDto
{
    public string? Name { get; set; }
    
    [Range(-90, 90)]
    public double? Latitude { get; set; }
    
    [Range(-180, 180)]
    public double? Longitude { get; set; }
}