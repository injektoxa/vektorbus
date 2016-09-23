namespace BlaBlaBusMVC.Models
{
    public class Price : Entity
    {
        public virtual double PriceForTrip { get; set; }

        public virtual Client Client { get; set; }

        public virtual Trip Trip { get; set; }
    }
}