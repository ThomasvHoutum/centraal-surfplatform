using Business.Database.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace Business.Database.Models;

[EntityTypeConfiguration(typeof(UserEntityTypeConfiguration))]
public class User
{
    public int Id { get; set; }

    public string? Username { get; set; }
    
    public string Email { get; set; }
    
    public string PasswordHash { get; set; }
    
    public UserRole Role { get; set; } = UserRole.Member;
}