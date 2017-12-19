using BlaBlaBusMVC.Models;

namespace BlaBlaBusMVC.ViewModels
{
    public class ClientTripViewModel
    {
        public string TripId { get; set; }

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

        public ClientTripViewModel(ClientTrip t)
        {
            var client = t.Client;

            Id = t.Id;
            ClientId = client.Id;
            Name = client.Name;
            Comments = client.Comments;
            HasDiscount = client.HasDiscount;
            Phone = client.Phone;
            From = t.From.Name;
            To = t.To.Name;
            Price = t.Price;
            IsStayInBus = t.IsStayInBus;
            HasBaggage = t.HasBaggage;
            AgentId = t.Agent?.Id;
            AgentName = t.Agent?.FullName;
            AgentPrice = t.AgentPrice;
            AdditionalExpenses = t.AdditionalExpenses;
            HasDisability = client.HasDisability;
            HasMinorChild = client.HasMinorChild;
        }
    }
}