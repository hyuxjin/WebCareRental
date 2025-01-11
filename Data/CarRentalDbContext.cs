using Microsoft.EntityFrameworkCore;
using CarRentalAPI.Models;

namespace CarRentalAPI.Data
{
    public class CarRentalDbContext : DbContext
    {
        public CarRentalDbContext(DbContextOptions<CarRentalDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<PaymentInfo> PaymentInfos { get; set; }  // Corrected DbSet name to be plural
        public DbSet<Booking> Bookings { get; set; }
    }
}
