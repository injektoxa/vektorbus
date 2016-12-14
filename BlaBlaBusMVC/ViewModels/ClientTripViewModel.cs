using BlaBlaBusMVC.Models;

namespace BlaBlaBusMVC.ViewModels
{
    public class ClientTripViewModel
    {
        public string Name { get; set; }

        public int Id { get; set; }

        public int ClientId { get; set; }

        public string Phone { get; set; }

        public string Comments { get; set; }

        public bool HasDiscount { get; set; }

        public double Price { get; set; }

        public string From { get; set; }

        public string To { get; set; }

        public int? AgentId { get; set; }

        public string AgentName { get; set; }

        public double? AgentPrice { get; set; }

        public double? AdditionalExpenses { get; set; }

        public bool IsStayInBus { get; set; }

        public bool HasBaggage { set; get; }

        public bool HasDisability { get; set; }

        public bool HasMinorChild { get; set; }

        public ClientTripViewModel()
        {
            
        }

        public ClientTripViewModel(ClientTrip clientTrip)
        {
            Id = clientTrip.Id;
            ClientId = clientTrip.Client.Id;
            Name = clientTrip.Client.Name;
            Comments = clientTrip.Client.Comments;
            HasDiscount = clientTrip.Client.HasDiscount;
            Phone = clientTrip.Client.Phone;
            From = clientTrip.From.Name;
            To = clientTrip.To.Name;
            Price = clientTrip.Price;
            IsStayInBus = clientTrip.IsStayInBus;
            HasBaggage = clientTrip.HasBaggage;
            AgentId = clientTrip.Agent?.Id;
            AgentName = clientTrip.Agent?.FullName;
            AgentPrice = clientTrip.AgentPrice;
            AdditionalExpenses = clientTrip.AdditionalExpenses;
            HasDisability = clientTrip.Client.HasDisability;
            HasMinorChild = clientTrip.Client.HasMinorChild;
        }
    }
}