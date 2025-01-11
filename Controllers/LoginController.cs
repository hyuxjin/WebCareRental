using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarRentalAPI.Data;
using CarRentalAPI.Models;
using System.Security.Cryptography;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly CarRentalDbContext _context;

    public LoginController(CarRentalDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == loginRequest.Email);
        if (user == null || !VerifyPassword(loginRequest.Password, user.PasswordHash))
        {
            return Unauthorized("Invalid email or password.");
        }

        // Example: Return success message and user info
        return Ok(new { Message = "Login successful", UserId = user.Id });
    }

    private bool VerifyPassword(string password, string storedHash)
    {
        using var sha256 = SHA256.Create();
        var hashedInput = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
        return hashedInput == storedHash;
    }
}

public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}
