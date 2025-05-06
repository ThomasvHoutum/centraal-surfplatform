using Business.Database;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace API.Tests.Integration;

public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Development");
        
        builder.ConfigureServices(services =>
        {
            // Remove the existing DbContext registration
            var descriptor = services.SingleOrDefault(serviceDescriptor => serviceDescriptor.ServiceType == typeof(IDbContextOptionsConfiguration<DatabaseContext>));
            if (descriptor != null)
                services.Remove(descriptor);
            
            // Add a DbContext using the in-memory database for testing
            services.AddDbContext<DatabaseContext>(options =>
            {
                options.UseInMemoryDatabase("TestDb");
            });
        });
    }
}