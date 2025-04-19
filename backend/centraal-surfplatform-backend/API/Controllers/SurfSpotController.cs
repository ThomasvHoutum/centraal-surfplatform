using Business.Database.Models;
using Business.Services.Interfaces;
using Business.Services.Models.SurfSpotService;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("[controller]")]
public class SurfSpotController : ControllerBase
{
    private readonly ISurfSpotService _surfSpotService;

    public SurfSpotController(ISurfSpotService surfSpotService)
    {
        _surfSpotService = surfSpotService;
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
}