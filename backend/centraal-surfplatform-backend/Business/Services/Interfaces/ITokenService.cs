using System.Security.Claims;

namespace Business.Services.Interfaces;

public interface ITokenService : ITransient
{
    /// <summary>
    /// Create a JWT token with provided claims
    /// </summary>
    /// <param name="claims"></param>
    /// <returns></returns>
    string CreateToken(params Claim[] claims);
}