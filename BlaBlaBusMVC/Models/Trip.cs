using System;
using System.Collections.Generic;

namespace BlaBlaBusMVC.Models
{
    public class Trip : Entity
    {
        public virtual Bus Bus { get; set; }

        public DateTime Date { get; set; }

        public virtual List<ClientTrip> ClientTrip { get; set; }

        public virtual City CityFrom { get; set; }

        public virtual City CityTo { get; set; }

        public string Comments { get; set; }
    }
}