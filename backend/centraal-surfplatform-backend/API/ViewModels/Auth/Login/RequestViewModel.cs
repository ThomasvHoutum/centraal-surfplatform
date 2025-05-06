using System.ComponentModel.DataAnnotations;

namespace API.ViewModels.Auth.Login;

public class RequestViewModel
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
}