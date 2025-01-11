using CarRentalAPI.Data;
using CarRentalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CarRentalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly CarRentalDbContext _context;

        public AccountController(CarRentalDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User user)
        {
            if (_context.Users.Any(u => u.Email == user.Email))
                return BadRequest("Email already in use.");

            // Hash the password before saving
            user.PasswordHash = HashPassword(user.PasswordHash);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] LoginRequest loginRequest)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

            if (user == null)
                return Unauthorized("User not found.");

            // Hash the entered password and compare with the stored hash
            var hashedPassword = HashPassword(loginRequest.Password);

            if (hashedPassword != user.PasswordHash)
                return Unauthorized("Invalid credentials.");

            return Ok(user);
        }

        public string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hash);  // Returns the hashed password as Base64 string
        }

        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);  // Return the list of users
        }

        private bool VerifyPassword(string password, string hashedPassword)
        {
            // Hash the entered password and compare with the stored hash
            var hash = HashPassword(password);
            return hash == hashedPassword;
        }
    }
}
