using System.ComponentModel.DataAnnotations.Schema;


namespace CarRentalAPI.Models
{
    public class PaymentInfo
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public string PaymentMethod { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }

        // If PaymentDetails should be ignored in the database:
        [NotMapped]
        public object PaymentDetails { get; set; }
    }

}
