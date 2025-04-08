using Business.Services.Models.AuthService;

namespace API.ViewModels.Auth.Register;

public static class Profile
{
    public static RegisterUserDto ToRegisterUserDto(this RequestViewModel self)
    {
        return new RegisterUserDto
        {
            Username = self.Username,
            Email = self.Email,
            Password = self.Password
        };
    }
}