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
        const int id = 1;
        
        // note: to check if the test fails if the database does contain the requested surfspot
        // we add a surfspot to the database
        /*
        var dto = new CreateSurfSpotDto
        {
            Name = "test",
            Latitude = 30,
            Longitude = 30
        };
        await surfSpotService.CreateSurfSpotAsync([dto]);
        */
        
        // Act & Assert
        // Since the database is empty, any id we request, should throw an exception
        await Assert.ThrowsAsync<KeyNotFoundException>(async () =>
        {
            await surfSpotService.GetSurfSpotByIdAsync(id);
        });

    }
}