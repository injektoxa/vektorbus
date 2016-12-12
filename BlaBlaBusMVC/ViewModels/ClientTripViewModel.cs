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
    }
}