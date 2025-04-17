using System.Security.Claims;
using API.ViewModels.Auth.Login;
using API.ViewModels.Auth.Register;
using Business.Services.Interfaces;
using Business.Services.Models.AuthService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ITokenService _tokenService;
    
    public AuthController(IAuthService authService, ITokenService tokenService)
    {
        _authService = authService;
        _tokenService = tokenService;
    }
    
    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Register([FromBody] ViewModels.Auth.Register.RequestViewModel request)
    {
        var userDto = await _authService.TryRegisterUserAsync(request.ToRegisterUserDto());
        
        var token = _tokenService.CreateToken(
            new Claim(ClaimTypes.NameIdentifier, userDto.Id.ToString()),
            new Claim(ClaimTypes.Role, userDto.Role.ToString()));
        
        return Ok(token);
    }
    
    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Login([FromBody] ViewModels.Auth.Login.RequestViewModel request)
    {
        var userDto = await _authService.TryLoginUserAsync(request.ToLoginUserDto());

        var token = _tokenService.CreateToken(
            new Claim(ClaimTypes.NameIdentifier, userDto.Id.ToString()),
            new Claim(ClaimTypes.Role, userDto.Role.ToString()));
        
        return Ok(token);
    }

    [HttpGet("member-only")]
    [Authorize(Roles = "Member")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> MemberOnly()
    {
        // THIS IS A TEST ENDPOINT ONLY
        return Ok();
    }
}