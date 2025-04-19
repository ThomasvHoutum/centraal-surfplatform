using Business.Database.Models;
using Business.Services.Interfaces;
using Business.Services.Models.SurfSpotService;

namespace Business.Services;

public class SurfSpotService : ISurfSpotService
{
    public async Task<IEnumerable<SurfSpot>> GetAllSurfSpotsAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<SurfSpot> GetSurfSpotByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task CreateSurfSpotAsync(CreateSurfSpotDto dto)
    {
        throw new NotImplementedException();
    }

    public async Task UpdateSurfSpotAsync(int id, UpdateSurfSpotDto dto)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteSurfSpotAsync(int id)
    {
        throw new NotImplementedException();
    }
}