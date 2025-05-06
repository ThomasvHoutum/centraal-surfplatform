using Business.Services;
using Business.Services.Models.AuthService;
using Business.Tests.Unit.Helpers;

namespace Business.Tests.Unit.Services;

public class AuthServiceTests
{
        [Fact]
        public async Task RegisterUser_ShouldRegister_NewUser()
        {
            // Arrange
            await using var context = DatabaseHelper.CreateInMemoryDbContext();
            var authService = new AuthService(context);
            var registerDto = new RegisterUserDto
            {
                Username = "testuser",
                Email = Guid.NewGuid() + "@example.com",
                Password = "Test123!"
            };

            // Act
            var result = await authService.TryRegisterUserAsync(registerDto);

            // Assert
            Assert.NotNull(result);
            Assert.True(result.Id > 0);
        }

        [Fact]
        public async Task RegisterUser_WithExistingEmail_ShouldThrowException()
        {
            // Arrange
            await using var context = DatabaseHelper.CreateInMemoryDbContext();
            var authService = new AuthService(context);
            var registerDto = new RegisterUserDto
            {
                Username = "testuser",
                Email = Guid.NewGuid() + "@example.com",
                Password = "Test123!"
            };

            // First registration should succeed
            await authService.TryRegisterUserAsync(registerDto);

            // Act & Assert
            // Second registration with the same email should throw an exception
            await Assert.ThrowsAsync<Exception>(async () =>
            {
                await authService.TryRegisterUserAsync(registerDto);
            });
        }

        [Fact]
        public async Task LoginUser_ShouldLogin_WithCorrectCredentials()
        {
            // Arrange
            await using var context = DatabaseHelper.CreateInMemoryDbContext();
            var authService = new AuthService(context);
            var registerDto = new RegisterUserDto
            {
                Username = "testuser",
                Email = Guid.NewGuid() + "@example.com",
                Password = "Test123!"
            };
            await authService.TryRegisterUserAsync(registerDto);

            var loginDto = new LoginUserDto
            {
                Email = registerDto.Email,
                Password = registerDto.Password
            };

            // Act
            var result = await authService.TryLoginUserAsync(loginDto);

            // Assert
            Assert.NotNull(result);
            Assert.True(result.Id > 0);
        }

        [Fact]
        public async Task LoginUser_WithIncorrectPassword_ShouldThrowException()
        {
            // Arrange
            using var context = DatabaseHelper.CreateInMemoryDbContext();
            var authService = new AuthService(context);
            var registerDto = new RegisterUserDto
            {
                Username = "testuser",
                Email = Guid.NewGuid() + "@example.com",
                Password = "Test123!"
            };
            await authService.TryRegisterUserAsync(registerDto);

            var loginDto = new LoginUserDto
            {
                Email = registerDto.Email,
                Password = "WrongPassword"
            };

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(async () =>
            {
                await authService.TryLoginUserAsync(loginDto);
            });
        }
}