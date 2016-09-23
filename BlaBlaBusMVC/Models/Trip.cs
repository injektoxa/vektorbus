using System;
using System.Collections.Generic;

namespace BlaBlaBusMVC.Models
{
    public class Trip : Entity
    {
        public virtual List<Price> Price { get; set; }

        public virtual Bus Bus { get; set; }

        public DateTime Date { get; set; }

        public virtual List<Client> Clients { get; set; }
    }
}