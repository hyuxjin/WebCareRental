namespace CarRentalAPI.Models
{
    public class BookingWithDetailsViewModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string CarName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalAmount { get; set; }
        public bool IsPaid { get; set; }
        public bool Accepted { get; set; } // Add this to track if the booking is confirmed
    }
}
