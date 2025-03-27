using Business.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Business.Database;

public class DatabaseContext : DbContext
{
    public DbSet<User> Users { get; set; }
    
    public string DbPath { get; }
    
    public DatabaseContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        
        // Database is placed in AppData/Local/
        DbPath = Path.Join(path, "centraal-surfplatform.db");
    }
    
    protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseSqlite($"Data Source={DbPath}");
}