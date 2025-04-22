using Business.Database;
using Business.Services;
using Business.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// TODO: Dynamically register all services
builder.Services.AddTransient<ITestService, TestService>();
builder.Services.AddHttpClient<OpenMeteoWeatherProviderService>();
builder.Services.AddScoped<IWeatherProviderService, OpenMeteoWeatherProviderService>();
builder.Services.AddScoped<IWeatherService>(provider =>
{
    var openMeteo = provider.GetRequiredService<OpenMeteoWeatherProviderService>();

    var providers = new Dictionary<string, IWeatherProviderService>
    {
        ["OpenMeteo"] = openMeteo
    };
    
    var dbContext = provider.GetRequiredService<DatabaseContext>();

    return new WeatherService(dbContext, providers);
});

// Database is placed in AppData/Local/
var dbPath = Path.Join(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "centraal-surfplatform.db");

// Register the database context for dependency injection as a transient service
builder.Services.AddDbContext<DatabaseContext>(options =>
{
    options.UseSqlite($"Data Source={dbPath}");
}, ServiceLifetime.Transient, ServiceLifetime.Transient);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();