using Business.Services;
using Business.Services.Models.SurfSpotService;
using Business.Tests.Unit.Helpers;

namespace Business.Tests.Unit.Services;

public class SurfSpotServiceTests
{
    [Fact]
    public async Task GetSurfSpotById_WhenIdDoesNotExist_ShouldThrowException()
    {
        // Arrange
        await using var context = DatabaseHelper.CreateInMemoryDbContext();
        var surfSpotService = new SurfSpotService(context);
        
        // Act & Assert
        // Note: Since the database is empty, any id we request, should throw an exception
        await Assert.ThrowsAsync<KeyNotFoundException>(async () =>
        {
            await surfSpotService.GetSurfSpotByIdAsync(1);
        });
    }
    
    [Fact]
    public async Task GetSurfSpotById_WhenIdExists_ShouldReturnSurfSpot()
    {
        // Arrange
        await using var context = DatabaseHelper.CreateInMemoryDbContext();
        var surfSpotService = new SurfSpotService(context);

        var createDto = new CreateSurfSpotDto
        {
            Name = "TestLocatie",
            Latitude = 52,
            Longitude = 40
        };
        await surfSpotService.CreateSurfSpotAsync([createDto]);
        var created = (await surfSpotService.GetAllSurfSpotsAsync()).FirstOrDefault();

        // Act
        var result = await surfSpotService.GetSurfSpotByIdAsync(created.Id);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("TestLocatie", result.Name);
        Assert.Equal(52, result.Latitude);
        Assert.Equal(40, result.Longitude);
    }
    
    [Fact]
    public async Task CreateSurfSpotAsync_WhenSpotIsNew_ShouldAddToDatabase()
    {
        await using var context = DatabaseHelper.CreateInMemoryDbContext();
        var surfSpotService = new SurfSpotService(context);

        var createDto = new CreateSurfSpotDto
        {
            Name = "TestLocatie",
            Latitude = 52,
            Longitude = 40
        };

        // Act
        await surfSpotService.CreateSurfSpotAsync([createDto]);
        var allSpots = await surfSpotService.GetAllSurfSpotsAsync(); // should contain exactly 1 item

        // Assert
        var spot = Assert.Single(allSpots);
        Assert.Equal("TestLocatie", spot.Name);
        Assert.Equal(52, spot.Latitude);
        Assert.Equal(40, spot.Longitude);
    }
    
    [Fact]
    public async Task UpdateSurfSpotAsync_WhenIdExists_ShouldUpdateValues()
    {
        // Arrange
        await using var context = DatabaseHelper.CreateInMemoryDbContext();
        var surfSpotService = new SurfSpotService(context);
        
        await surfSpotService.CreateSurfSpotAsync([
            new CreateSurfSpotDto { Name = "OudeLocatie", Latitude = 48, Longitude = 23 }
        ]);
        var target = (await surfSpotService.GetAllSurfSpotsAsync()).Single();

        var updateDto = new UpdateSurfSpotDto
        {
            Name = "NieuweLocatie",
            Latitude = 23,
            Longitude = 67
        };

        // Act
        await surfSpotService.UpdateSurfSpotAsync(target.Id, updateDto);
        var updated = await surfSpotService.GetSurfSpotByIdAsync(target.Id);

        // Assert
        Assert.Equal("NieuweLocatie", updated.Name);
        Assert.Equal(updateDto.Latitude, updated.Latitude);
        Assert.Equal(updateDto.Longitude, updated.Longitude);
    }
    
    [Fact]
    public async Task DeleteSurfSpotAsync_WhenIdExists_ShouldRemoveFromDatabase()
    {
        // Arrange
        await using var context = DatabaseHelper.CreateInMemoryDbContext();
        var surfSpotService = new SurfSpotService(context);

        await surfSpotService.CreateSurfSpotAsync([
            new CreateSurfSpotDto { Name = "OudeLocatie", Latitude = 48, Longitude = 23 }
        ]);
        var spot = (await surfSpotService.GetAllSurfSpotsAsync()).Single();

        // Act
        await surfSpotService.DeleteSurfSpotAsync(spot.Id);
        var remaining = await surfSpotService.GetAllSurfSpotsAsync();

        // Assert
        Assert.Empty(remaining);
    }
}