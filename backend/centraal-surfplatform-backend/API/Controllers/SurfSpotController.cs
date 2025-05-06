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
            await _surfSpotService.CreateSurfSpotAsync(dto);
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
}