using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BlaBlaBusMVC.Models
{
    public class Agent : Entity
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required]
        [MaxLength(200)]
        public string Sername { get; set; }

        [Required]
        [MaxLength(200)]
        public string Phone { get; set; }

        public virtual List<ClientTrip> ClientTrips { get; set; }
    }
}