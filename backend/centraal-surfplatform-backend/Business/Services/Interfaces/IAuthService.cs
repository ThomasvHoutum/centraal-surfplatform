using Business.Services.Models.AuthService;

namespace Business.Services.Interfaces;

public interface IAuthService : ITransient
{
    /// <summary>
    /// Checks if the user with the given email already exists
    /// </summary>
    /// <param name="email"></param>
    /// <returns></returns>
    Task<bool> UserEmailExistsAsync(string email);
    
    /// <summary>
    /// Register a new user
    /// </summary>
    /// <param name="userDto"></param>
    Task RegisterUserAsync(RegisterUserDto userDto);
    
    /// <summary>
    /// Login a user
    /// </summary>
    /// <param name="userDto"></param>
    /// <returns></returns>
    Task<bool> TryLoginUserAsync(LoginUserDto userDto);
}