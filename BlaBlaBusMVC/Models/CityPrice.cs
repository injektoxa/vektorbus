namespace BlaBlaBusMVC.Models
{
    public class CityPrice : Entity
    {
        public City CityFrom { get; set; }

        public City CityTo { get; set; }

        public double Price { get; set; }
    }
}