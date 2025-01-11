using CarRentalAPI.Data;
using CarRentalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRentalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly CarRentalDbContext _context;

        public BookingController(CarRentalDbContext context)
        {
            _context = context;
        }

        // In BookingController
        // In BookingController

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookingsByUser(int userId)
        {
            var bookings = await _context.Bookings
                .Where(b => b.UserId == userId)  // Filter by userId
                .ToListAsync();

            var bookingDetails = new List<object>();

            foreach (var booking in bookings)
            {
                // Retrieve car details using CarId
                var car = await _context.Cars.FindAsync(booking.CarId);
                if (car != null)
                {
                    // Add the booking with car name and accepted status to the list
                    bookingDetails.Add(new
                    {
                        booking.Id,
                        CarId = booking.CarId,
                        CarName = car.Name,  // Assuming Car has a Name property
                        booking.StartDate,
                        booking.EndDate,
                        booking.IsPaid,
                        booking.Accepted  // Add Accepted field here
                    });
                }
                else
                {
                    // If car is not found, return the booking with a default car name
                    bookingDetails.Add(new
                    {
                        booking.Id,
                        CarId = booking.CarId,
                        CarName = "Unknown Car", // Default name if car is not found
                        booking.StartDate,
                        booking.EndDate,
                        booking.IsPaid,
                        booking.Accepted  // Add Accepted field here
                    });
                }
            }

            return Ok(bookingDetails);  // Return the bookings with car names and accepted status
        }


        [HttpPut("confirm/{id}")]
        public IActionResult ConfirmBooking(int id)
        {
            var booking = _context.Bookings.FirstOrDefault(b => b.Id == id);
            if (booking == null)
            {
                return BadRequest("Booking not found");
            }

            // Set booking as confirmed
            booking.Accepted = true;  // Ensure this line sets the 'Accepted' field correctly
            _context.SaveChanges();

            return Ok(booking);  // Return the updated booking, including 'Accepted' field
        }
        [HttpGet]
        public async Task<IActionResult> GetBookings()
        {
            var bookings = await _context.Bookings
                .Join(_context.Users, b => b.UserId, u => u.Id, (b, u) => new { b, u })
                .Join(_context.Cars, temp => temp.b.CarId, c => c.Id, (temp, c) => new BookingWithDetailsViewModel
                {
                    Id = temp.b.Id,
                    UserName = temp.u.Name, // User Name from Users table
                    CarName = c.Name,       // Car Name from Cars table
                    StartDate = temp.b.StartDate,
                    EndDate = temp.b.EndDate,
                    TotalAmount = temp.b.TotalAmount,
                    IsPaid = temp.b.IsPaid,
                    Accepted = temp.b.Accepted
                })
                .ToListAsync();

            return Ok(bookings);
        }
        
        [HttpPost]
        public async Task<ActionResult<Booking>> BookCar(Booking booking)
        {
            var car = await _context.Cars.FindAsync(booking.CarId);
            if (car == null || !car.IsAvailable)
                return BadRequest("Car not available.");

            booking.TotalAmount = car.PricePerDay * (booking.EndDate - booking.StartDate).Days;
            _context.Bookings.Add(booking);
            car.IsAvailable = false; // Mark car as unavailable
            await _context.SaveChangesAsync();

            return Ok(booking);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBookingById(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound("Booking not found.");
            }

            return Ok(booking);
        }

        
    }
}
