using System.Text;
using Business.Database;
using Business.Services;
using Business.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")   
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var configuration = builder.Configuration;

// Retrieve JWT settings
var jwtKey = configuration["Jwt:Key"];
var issuer = configuration["Jwt:Issuer"];
var audience = configuration["Jwt:Audience"];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = issuer,
            ValidAudience = audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddControllers();

// TODO: Dynamically register all services
builder.Services.AddScoped<ISurfSpotService, SurfSpotService>();
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
builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddTransient<ITokenService, TokenService>();

// Database is placed in AppData/Local/
var dbPath = Path.Join(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "centraal-surfplatform.db");

// Register the database context for dependency injection as a transient service
builder.Services.AddDbContext<DatabaseContext>(options =>
{
    options.UseSqlite($"Data Source={dbPath}");
}, ServiceLifetime.Transient, ServiceLifetime.Transient);

// Learn more about configuring OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo
    {
        Title   = "Central Surf Platform API",
        Version = "v1"
    });
    swaggerGenOptions.CustomSchemaIds(type => type.FullName);
});

var app = builder.Build();

app.UseCors("AllowReactDev");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(swaggerUiOptions =>
    {
        swaggerUiOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Central Surf Platform v1");
    });
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

// Make the implicit Program class public so test projects can access it
public partial class Program { }
