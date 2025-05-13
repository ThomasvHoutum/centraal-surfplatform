using System.Net;
using System.Net.Http.Json;

namespace API.Tests.Integration.Controllers;

public class AuthControllerTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;

        public AuthControllerTests(CustomWebApplicationFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Register_ReturnsToken_OnSuccessfulRegistration()
        {
            // Arrange
            var registerRequest = new ViewModels.Auth.Register.RequestViewModel
            {
                Username = "testuser",
                Email = Guid.NewGuid() + "@example.com",
                Password = "Test123!"
            };

            // Act: Call the register endpoint
            var response = await _client.PostAsJsonAsync("/Auth/register", registerRequest);

            // Assert: Ensure a 200 OK result and that a token was returned
            response.EnsureSuccessStatusCode();
            var token = await response.Content.ReadAsStringAsync();
            Assert.False(string.IsNullOrEmpty(token));
        }

        [Fact]
        public async Task Login_ReturnsToken_OnSuccessfulLogin()
        {
            // Arrange: First register a new user
            var registerRequest = new ViewModels.Auth.Register.RequestViewModel
            {
                Username = "testuser",
                Email = Guid.NewGuid() + "@example.com",
                Password = "Test123!"
            };
            var registerResponse = await _client.PostAsJsonAsync("/Auth/register", registerRequest);
            registerResponse.EnsureSuccessStatusCode();

            // Arrange: Prepare a login request with the same email/password
            var loginRequest = new ViewModels.Auth.Login.RequestViewModel
            {
                Email = registerRequest.Email,
                Password = registerRequest.Password
            };

            // Act: Call the login endpoint
            var loginResponse = await _client.PostAsJsonAsync("/Auth/login", loginRequest);

            // Assert: Ensure a 200 OK result and that a token was returned
            loginResponse.EnsureSuccessStatusCode();
            var token = await loginResponse.Content.ReadAsStringAsync();
            
            Assert.False(string.IsNullOrEmpty(token));
        }

        [Fact]
        public async Task MemberOnly_ReturnsUnauthorized_WhenNotAuthenticated()
        {
            // Act: Call the member-only endpoint without any Authorization header
            var response = await _client.GetAsync("/Auth/member-only");

            // Assert: Expect an HTTP 401 Unauthorized response
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task MemberOnly_ReturnsOk_WhenAuthenticatedWithMemberRole()
        {
            // Arrange: Register a user that will receive a role of "Member"
            var registerRequest = new ViewModels.Auth.Register.RequestViewModel
            {
                Username = "memberUser",
                Email = Guid.NewGuid() + "@example.com",
                Password = "Test123!"
            };
            var registerResponse = await _client.PostAsJsonAsync("/Auth/register", registerRequest);
            registerResponse.EnsureSuccessStatusCode();
            var token = await registerResponse.Content.ReadAsStringAsync();

            // Set the Authorization header with the obtained token
            _client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            // Act: Call the protected member-only endpoint
            var response = await _client.GetAsync("/Auth/member-only");

            // Assert: Ensure a 200 OK response now that the request is authenticated
            response.EnsureSuccessStatusCode();
        }
}