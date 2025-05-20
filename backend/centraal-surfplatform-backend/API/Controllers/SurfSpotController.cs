using System.Text.Json;
using Business.Database.Models;
using Business.Services.Interfaces;
using Business.Services.Models.SurfSpotService;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class SurfSpotController : ControllerBase
{
    private readonly ISurfSpotService _surfSpotService;

    public SurfSpotController(ISurfSpotService surfSpotService)
    {
        _surfSpotService = surfSpotService;
    }
    
    [HttpGet("test")]
    public IActionResult GetSurfSpotsTestData()
    {
        List<SurfSpot> testSurfSpots = new List<SurfSpot>();
        testSurfSpots.Add(new SurfSpot{Id = 1, Name = "Scheveningen", Latitude = 52.1029, Longitude = 4.2695});
        testSurfSpots.Add(new SurfSpot{Id = 2, Name = "Zandvoort", Latitude = 52.3749, Longitude = 	4.5295});
        testSurfSpots.Add(new SurfSpot{Id = 3, Name = "Wijk aan Zee", Latitude = 52.4937, Longitude = 4.6111});
        testSurfSpots.Add(new SurfSpot{Id = 4, Name = "IJmuiden", Latitude = 52.4516, Longitude = 4.5728});
        testSurfSpots.Add(new SurfSpot{Id = 5, Name = "Hoek van Holland", Latitude = 51.9780, Longitude = 4.1190});
        return Ok(testSurfSpots);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllSurfSpotsAsync()
    {
        try
        {
            return Ok(await _surfSpotService.GetAllSurfSpotsAsync());
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while retrieving all surf spots", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSurfSpotByIdAsync(int id)
    {
        try
        {
            return Ok(await _surfSpotService.GetSurfSpotByIdAsync(id));
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"An error occurred while retrieving surf spot with id {id}", error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateSurfSpotAsync(CreateSurfSpotDto dto)
    {
        try
        {
            await _surfSpotService.CreateSurfSpotAsync(new[] { dto });
            return Ok(new { message = "Succesfully created new surf spot" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while creating the surf spot", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSurfSpotAsync(int id, UpdateSurfSpotDto dto)
    {
        try
        {
            await _surfSpotService.UpdateSurfSpotAsync(id, dto);
            return Ok(new { message = $"Succesfully updated surf spot with id {id}" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"An error occurred while updating the surf spot with id {id}", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSurfSpotAsync(int id)
    {
        try
        {
            await _surfSpotService.DeleteSurfSpotAsync(id);
            return Ok(new { message = $"Succesfully deleted surf spot with id {id}" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"An error occurred while deleting the surf spot with id {id}", error = ex.Message });
        }
    }

    [HttpPost("import-file")]
    public async Task<IActionResult> ImportSurfSpotsFromFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded");
        
        try
        {
            using var reader  = new StreamReader(file.OpenReadStream());
            var json = await reader.ReadToEndAsync();
            
            var geoJson = JsonSerializer.Deserialize<SurfSpotGeoJsonDto>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (geoJson == null || geoJson.Features.Count == 0)
                return BadRequest("No surf spots found in the json file");

            var surfSpots = geoJson.Features
                .Where(s => s.Properties.Icon == "windsurfing.png") // use icon name to filter out the windsurfing locations
                .Select(s => new CreateSurfSpotDto
                {
                    Name = s.Properties.MarkerName,
                    Latitude = s.Geometry.Coordinates[1], // GeoJSON uses [lon, lat]
                    Longitude = s.Geometry.Coordinates[0]
                }).ToList();


            await _surfSpotService.CreateSurfSpotAsync(surfSpots);
            
            return Ok(new { message = $"Successfully imported surf spots"});

        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error importing from file", error = ex.Message });
        }
    }
}