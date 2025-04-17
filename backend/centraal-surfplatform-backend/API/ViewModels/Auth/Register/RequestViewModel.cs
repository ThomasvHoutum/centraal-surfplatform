using System.ComponentModel.DataAnnotations;

namespace API.ViewModels.Auth.Register;

public class RequestViewModel
{
    public string? Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
}