using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using BlaBlaBusMVC.ViewModels;

namespace BlaBlaBusMVC.Models
{
    public class Trip : Entity
    {
        public virtual Bus Bus { get; set; }

        public virtual Driver Driver { get; set; }

        public DateTime Date { get; set; }

        public DateTime ArrivalDate { get; set; }

        public virtual List<ClientTrip> ClientTrip { get; set; }

        public virtual City CityFrom { get; set; }

        public virtual City CityTo { get; set; }

        public string Comments { get; set; }

        public string JsonUnexpectedExpenses { get; set; }

        [NotMapped]
        public List<ExpenseViewModel> UnexpectedExpenses => 
            JsonConvert.DeserializeObject<List<ExpenseViewModel>>(this.JsonUnexpectedExpenses ?? string.Empty);

        public string JsonCompulsoryExpenses { get; set; }

        [NotMapped]
        public List<ExpenseViewModel> CompulsoryExpenses => 
            JsonConvert.DeserializeObject<List<ExpenseViewModel>>(this.JsonCompulsoryExpenses ?? string.Empty);
    }
}