using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Business.Migrations
{
    /// <inheritdoc />
    public partial class UpdateWaveDataMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WaterTemperature",
                table: "WeatherData",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WaveDirection",
                table: "WeatherData",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WavePeriod",
                table: "WeatherData",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WaterTemperature",
                table: "WeatherData");

            migrationBuilder.DropColumn(
                name: "WaveDirection",
                table: "WeatherData");

            migrationBuilder.DropColumn(
                name: "WavePeriod",
                table: "WeatherData");
        }
    }
}
