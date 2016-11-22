namespace BlaBlaBusMVC.Models
{
    public class ClientTrip : Entity
    {
        public virtual Client Client { set; get; }

        public double Price { set; get; }

        public virtual Trip Trip { set; get; }

        public virtual City From { set; get; }

        public virtual City To { set; get; }

        public virtual bool IsStayInBus { set; get; }

        public virtual bool HasBaggage { set; get; }
  }
}