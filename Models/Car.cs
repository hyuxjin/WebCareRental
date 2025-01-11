namespace CarRentalAPI.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Model { get; set; }
        public decimal PricePerDay { get; set; }
        public decimal PricePerHour { get; set; }
        public bool IsAvailable { get; set; }
    }

}
