using System;
using System.Collections.Generic;

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

        public double CompulsoryExpenses { get; set; }

        public double? UnexpectedExpenses { get; set; }

        public string UnexpectedExpensesComments { get; set; }
    }
}