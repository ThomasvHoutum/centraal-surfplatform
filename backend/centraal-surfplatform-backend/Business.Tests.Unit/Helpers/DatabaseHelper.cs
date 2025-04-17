using Business.Database;
using Microsoft.EntityFrameworkCore;

namespace Business.Tests.Unit.Helpers;

public class DatabaseHelper
{
    public static DatabaseContext CreateInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<DatabaseContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        
        return new DatabaseContext(options);
    }
}