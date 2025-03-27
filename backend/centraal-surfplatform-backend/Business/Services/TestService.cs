using Business.Database;
using Business.Database.Models;
using Business.Services.Interfaces;

namespace Business.Services;

public class TestService : ITestService
{
    public async Task<string> GetTest()
    {
        // TODO: Get database by factory
        using var db = new DatabaseContext();
        
        db.Add(new User());
        await db.SaveChangesAsync();
        
        return "Test";
    }
}