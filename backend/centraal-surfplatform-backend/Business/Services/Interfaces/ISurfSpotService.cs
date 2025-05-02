using Business.Database.Models;
using Business.Services.Models.SurfSpotService;

namespace Business.Services.Interfaces;

public interface ISurfSpotService
{
    Task<IEnumerable<SurfSpot>> GetAllSurfSpotsAsync();
    Task<SurfSpot> GetSurfSpotByIdAsync(int id);
    Task CreateSurfSpotAsync(SurfSpot surfSpot);
    Task UpdateSurfSpotAsync(int id, UpdateSurfSpotDto dto);
    Task DeleteSurfSpotAsync(int id);
}