﻿// <auto-generated />
using Business.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Business.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20250408135650_AddWeatherDataTable")]
    partial class AddWeatherDataTable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.3");

            modelBuilder.Entity("Business.Database.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Business.Database.Models.WeatherData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<double?>("Latitude")
                        .HasColumnType("REAL");

                    b.Property<double?>("Longitude")
                        .HasColumnType("REAL");

                    b.PrimitiveCollection<string>("Temperature")
                        .HasColumnType("TEXT");

                    b.PrimitiveCollection<string>("Time")
                        .HasColumnType("TEXT");

                    b.PrimitiveCollection<string>("WaveHeight")
                        .HasColumnType("TEXT");

                    b.PrimitiveCollection<string>("WindDirection")
                        .HasColumnType("TEXT");

                    b.PrimitiveCollection<string>("WindSpeed")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("WeatherData");
                });
#pragma warning restore 612, 618
        }
    }
}
