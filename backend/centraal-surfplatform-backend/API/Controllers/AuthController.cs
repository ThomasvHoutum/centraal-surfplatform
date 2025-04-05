using Business.Services.Interfaces;
using Business.Services.Models.AuthService;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }
    
    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Register([FromBody] ViewModels.Auth.Register.RequestViewModel request)
    {
        await _authService.RegisterUserAsync(new RegisterUserDto
        {
            Username = request.Username,
            Email = request.Email,
            Password = request.Password
        });
        
        return Ok();
    }
    
    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Login([FromBody] ViewModels.Auth.Login.RequestViewModel request)
    {
        var success = await _authService.TryLoginUserAsync(new LoginUserDto
        {
            Email = request.Email,
            Password = request.Password
        });
        
        if (!success)
            return BadRequest();
        
        return Ok();
    }
}