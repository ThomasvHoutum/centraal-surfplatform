using Business.Database.Models.Enums;

namespace Business.Services.Models.AuthService;

public class UserDto
{
    public int Id { get; set; }
    
    public UserRole Role { get; set; }
}