using Microsoft.EntityFrameworkCore;
using CarRentalAPI.Data;
using CarRentalAPI.Models;  // Add this line
using CarRentalAPI.Controllers;  // Add this line

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<CarRentalDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));


// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:4200")  // Allow Angular frontend
              .AllowAnyMethod()                     // Allow all HTTP methods
              .AllowAnyHeader()                     // Allow all headers
              .AllowCredentials();                  // Allow credentials like cookies
    });
});

// Top-level statements to create the default admin user
Console.WriteLine("Checking if default admin user needs to be created...");

using (var scope = builder.Services.BuildServiceProvider().CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<CarRentalDbContext>();

    if (!context.Users.Any(u => u.Email == "admin@testing.com")) // Check if admin user does not already exist
    {
        
        Console.WriteLine("Creating default admin user...");
        var adminUser = new User
        {
            Name = "Admin",
            Email = "admin@testing.com",
            PasswordHash = new AccountController(context).HashPassword("admin123") // Hash the password securely
        };

        context.Users.Add(adminUser);
        context.SaveChanges();
        Console.WriteLine("Default admin user created.");
    }
    else
    {
        Console.WriteLine("Admin user already exists.");
    }
}

builder.Services.AddDbContext<CarRentalDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

builder.Services.AddControllers();

var app = builder.Build();

// Enable CORS globally, should be applied before `app.MapControllers()`
app.UseCors("AllowAngularOrigin");

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
