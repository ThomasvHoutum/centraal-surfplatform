using Business.Services.Models.AuthService;

namespace API.ViewModels.Auth.Login;

public static class Profile
{
    public static LoginUserDto ToLoginUserDto(this RequestViewModel self)
    {
        return new LoginUserDto
        {
            Email = self.Email,
            Password = self.Password
        };
    }
}