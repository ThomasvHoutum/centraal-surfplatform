using Business.Services.Models.AuthService;

namespace Business.Services.Interfaces;

public interface IAuthService : ITransient
{
    /// <summary>
    /// Register a new user
    /// </summary>
    /// <param name="registerUserDto"></param>
    Task<UserDto> TryRegisterUserAsync(RegisterUserDto registerUserDto);
    
    /// <summary>
    /// Login a user
    /// </summary>
    /// <param name="loginUserDto"></param>
    /// <returns></returns>
    Task<UserDto> TryLoginUserAsync(LoginUserDto loginUserDto);
}