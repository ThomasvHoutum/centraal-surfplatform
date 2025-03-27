using Business.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("[controller]")]
public class TestController : ControllerBase
{
    private readonly ITestService _testService;
    
    public TestController(ITestService testService)
    {
        _testService = testService;
    }
    
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _testService.GetTest());
    }
}