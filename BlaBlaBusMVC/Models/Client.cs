using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BlaBlaBusMVC.Models
{
    public class Client : Entity
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        public virtual List<Trip> Trips { get; set; }

        [Required]
        [MaxLength(200)]
        public string Phone { get; set; }
    }
}