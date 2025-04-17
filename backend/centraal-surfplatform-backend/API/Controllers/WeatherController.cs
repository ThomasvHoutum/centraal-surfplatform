using Business.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("[controller]")]
public class WeatherController : ControllerBase
{
    private readonly IWeatherService _weatherService;

    public WeatherController(IWeatherService weatherService)
    {
        this._weatherService = weatherService;
    }
    
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] double latitude, [FromQuery] double longitude)
    {
        return Ok(await _weatherService.GetWeatherDataAsync(latitude, longitude));
    }
}