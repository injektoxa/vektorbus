using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Xml.Serialization;

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

        [NotMapped]
        public string FullName
        {
            get { return Name + ' ' + Sername; }
        }

        [Required]
        [MaxLength(200)]
        public string Phone { get; set; }

        public virtual List<ClientTrip> ClientTrips { get; set; }
    }
}