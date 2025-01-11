using CarRentalAPI.Data;
using CarRentalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CarRentalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly CarRentalDbContext _context;

        public PaymentController(CarRentalDbContext context)
        {
            _context = context;
        }

        // Process the payment (simplified)
        [HttpPost("process")]
        public IActionResult ProcessPayment([FromBody] PaymentInfo paymentInfo)
        {
            var booking = _context.Bookings.Find(paymentInfo.BookingId);
            if (booking == null)
            {
                return NotFound(new { message = "Booking not found." });
            }

            // Simulate payment processing logic
            booking.IsPaid = true;
            _context.SaveChanges();

            return Ok(new { status = "success", message = "Payment processed successfully." });
        }

    }


}