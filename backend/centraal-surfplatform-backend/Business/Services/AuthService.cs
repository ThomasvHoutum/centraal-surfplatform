using Business.Database;
using Business.Database.Models;
using Business.Services.Interfaces;
using Business.Services.Models.AuthService;
using Microsoft.EntityFrameworkCore;

namespace Business.Services;

public class AuthService : IAuthService
{
    private readonly DatabaseContext _db;
    
    public AuthService(DatabaseContext db)
    {
        _db = db;
    }
    
    /// <inheritdoc />
    public async Task<bool> UserEmailExistsAsync(string email) => await _db.Users.AnyAsync(user => user.Email == email);

    /// <inheritdoc />
    public async Task RegisterUserAsync(RegisterUserDto userDto)
    {
        // Check if a user with this email already exists
        if (await UserEmailExistsAsync(userDto.Email))
            throw new Exception("User with this email already exists");
        
        // Hash password
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
        
        // Create new user
        var user = new User
        {
            Username = userDto.Username,
            Email = userDto.Email,
            PasswordHash = passwordHash
        };
        
        // Save user to database
        _db.Users.Add(user);
        await _db.SaveChangesAsync();
    }

    /// <inheritdoc />
    public async Task<bool> TryLoginUserAsync(LoginUserDto userDto)
    {
        // Check if a user with this email exists
        if (!await UserEmailExistsAsync(userDto.Email))
            throw new Exception("User with this email does not exist");
        
        // Check if the password is correct
        var user = await _db.Users.FirstOrDefaultAsync(user => user.Email == userDto.Email);
        if (!BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash))
            throw new Exception("Incorrect password!");

        return true;
    }
}