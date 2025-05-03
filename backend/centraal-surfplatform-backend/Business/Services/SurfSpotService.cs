using Business.Database;
using Business.Database.Models;
using Business.Services.Interfaces;
using Business.Services.Models.SurfSpotService;
using Microsoft.EntityFrameworkCore;

namespace Business.Services;

public class SurfSpotService : ISurfSpotService
{
    private readonly DatabaseContext _db;

    public SurfSpotService(DatabaseContext db)
    {
        _db = db;
    }
    
    public async Task<IEnumerable<SurfSpot>> GetAllSurfSpotsAsync()
    {
        var surfSpots = await _db.SurfSpots.ToListAsync();
        if (surfSpots == null)
        {
            throw new Exception("No surf spots found");
        }
        return surfSpots;
    }

    public async Task<SurfSpot> GetSurfSpotByIdAsync(int id)
    {
        var surfSpot = await _db.SurfSpots.FindAsync(id);
        if (surfSpot == null)
        {
            throw new KeyNotFoundException($"No surf spot with id {id} found");
        }
        return surfSpot;
    }

    public async Task CreateSurfSpotAsync(SurfSpot surfSpot)
    {
        try
        {
            // add to db and save changes
            _db.SurfSpots.Add(surfSpot);
            await _db.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task UpdateSurfSpotAsync(SurfSpot updatedSurfSpot)
    {
        try
        {
            var currentSurfSpot = await _db.SurfSpots.FindAsync(updatedSurfSpot.Id);
            if (currentSurfSpot == null)
            {
                throw new KeyNotFoundException($"No surf spot with id {updatedSurfSpot.Id} found");
            }
            
            // only update name if a new value is given
            if (updatedSurfSpot.Name != null)
            {
                currentSurfSpot.Name = updatedSurfSpot.Name;
            }
            
            // always update coordinates
            currentSurfSpot.Latitude = updatedSurfSpot.Latitude;
            currentSurfSpot.Longitude = updatedSurfSpot.Longitude;
            
            await _db.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception($"An error occurred while updating surf spot with id {updatedSurfSpot.Id}", ex);
        }
    }

    public async Task DeleteSurfSpotAsync(int id)
    {
        var surfSpot = await _db.SurfSpots.FindAsync(id);
        if (surfSpot != null)
        {
            _db.SurfSpots.Remove(surfSpot);
            await _db.SaveChangesAsync();
        }
        else
        {
            throw new KeyNotFoundException($"No surf spot with id {id} found");
        }
    }
}