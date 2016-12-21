using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BlaBlaBusMVC.Models
{
    public class Client : Entity
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        public virtual List<ClientTrip> ClientTrips { get; set; }

        [Required]
        [MaxLength(200)]
        public string Phone { get; set; }

        public bool HasDiscount { get; set; }

        public string Comments { get; set; }

        public object Secret { get; internal set; }

        public string AllowedOrigin { get; internal set; }

        public bool Active { get; internal set; }

        public bool HasDisability { get; set; }

        public bool HasMinorChild { get; set; }
    }
}