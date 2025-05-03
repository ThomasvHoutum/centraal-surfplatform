using Business.Database.Models;
using Business.Services.Models.SurfSpotService;

namespace Business.Services.Interfaces;

public interface ISurfSpotService
{
    Task<IEnumerable<SurfSpot>> GetAllSurfSpotsAsync();
    Task<SurfSpot> GetSurfSpotByIdAsync(int id);
    Task CreateSurfSpotAsync(SurfSpot surfSpot);
    Task UpdateSurfSpotAsync(SurfSpot updatedSurfSpot);
    Task DeleteSurfSpotAsync(int id);
}