using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarRentalAPI.Data;
using CarRentalAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarRentalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly CarRentalDbContext _context;

        public CarsController(CarRentalDbContext context)
        {
            _context = context;
        }

        // 1. Get all available cars
        [HttpGet("available")]
        public async Task<ActionResult<IEnumerable<Car>>> GetAvailableCars()
        {
            var availableCars = await _context.Cars
                                .AsNoTracking() // Optimizes query performance
                                .Where(car => car.IsAvailable)
                                .ToListAsync();

            return Ok(availableCars);
        }

        // 2. Get all cars (for listing)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> GetAllCars()
        {
            var cars = await _context.Cars
                                .AsNoTracking() // Optimizes query performance
                                .ToListAsync();

            return Ok(cars);
        }

        [HttpPost]
        public async Task<ActionResult<Car>> AddCar(Car car)
        {
            if (car == null)
            {
                return BadRequest("Car data is invalid.");
            }

            car.IsAvailable = true;  // Convert 'Available' to true and 'Unavailable' to false

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCar), new { id = car.Id }, car);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCar(int id, [FromBody] Car car)
        {
            if (car == null || id != car.Id)
            {
                return BadRequest("Invalid car data or ID mismatch.");
            }

            _context.Entry(car).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarExists(id))
                {
                    return NotFound("Car not found.");
                }
                else
                {
                    throw; // re-throw if update failed
                }
            }

            return NoContent();
        }

        // 4. Get car by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(int id)
        {
            var car = await _context.Cars
                            .AsNoTracking()
                            .FirstOrDefaultAsync(c => c.Id == id);

            if (car == null)
            {
                return NotFound("Car not found.");
            }

            return Ok(car);
        }


        // 6. Delete a car
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
            {
                return NotFound("Car not found.");
            }

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CarExists(int id)
        {
            return _context.Cars.Any(c => c.Id == id);
        }
    }
}
