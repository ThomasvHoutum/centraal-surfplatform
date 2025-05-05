using System.ComponentModel.DataAnnotations;

namespace Business.Services.Models.SurfSpotService;

public class CreateSurfSpotDto
{
    public string? Name { get; set; }
    
    [Required]
    [Range(-90, 90)]
    public double Latitude { get; set; }
    
    [Required]
    [Range(-180, 180)]
    public double Longitude { get; set; }
}