using API.ViewModels.Auth.Register;
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
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Register([FromBody] RequestViewModel request)
    {
        await _authService.RegisterUser(new RegisterUserDto
        {
            Username = request.Username,
            Email = request.Email,
            Password = request.Password
        });
        
        return Ok();
    }
}