using Business.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Business.Database;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
}