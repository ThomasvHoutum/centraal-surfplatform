using Business.Services;
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
        const int id = 10;
        
        // Act & Assert
        // Since the database is empty, any id we request, should throw an exception
        await Assert.ThrowsAsync<KeyNotFoundException>(async () =>
        {
            await surfSpotService.GetSurfSpotByIdAsync(id);
        });

    }
}