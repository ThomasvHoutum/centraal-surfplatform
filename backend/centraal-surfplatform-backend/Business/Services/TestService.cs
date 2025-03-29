using Business.Database;
using Business.Database.Models;
using Business.Services.Interfaces;

namespace Business.Services;

public class TestService : ITestService
{
    private readonly DatabaseContext _db;
    
    public TestService(DatabaseContext db)
    {
        _db = db;
    }
    
    public async Task<string> GetTest()
    {
        _db.Add(new User());
        await _db.SaveChangesAsync();
        
        return "Test";
    }
}