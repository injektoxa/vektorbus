﻿namespace BlaBlaBusMVC.ViewModels
{
    public class ClientViewModel
    {
        public string Name { get; set; }

        public int Id { get; set; }

        public string Phone { get; set; }

        public string Comments { get; set; }

        public bool HasDiscount { get; set; }

        public double Price { get; set; }

        public string From { get; set; }

        public string To { get; set; }

        public int? AgentId { get; set; }

        public double? AgentPrice { get; set; }

        public double? AdditionalExpenses { get; set; }

        public bool IsStayInBus { get; set; }

        public bool HasBaggage { set; get; }
  }
}