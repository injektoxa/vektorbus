using System.ComponentModel.DataAnnotations;

namespace BlaBlaBusMVC.Models
{
    public class Bus : Entity
    {
        [MaxLength(100)]
        [Required]
        public string RegistrationNumber { get; set; }

        public int PlacesCount { get; set; }

        public string FriendlyName { get; set; }
    }
}