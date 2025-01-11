namespace CarRentalAPI.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int CarId { get; set; }
        public int UserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalAmount { get; set; }
        public bool IsPaid { get; set; }

        public bool Accepted {get; set; }
    }

}
