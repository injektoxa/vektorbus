using System.ComponentModel.DataAnnotations;

namespace BlaBlaBusMVC.Models
{
    public class Driver : Entity
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        [MaxLength(200)]
        public string Phone { get; set; }

        [MaxLength(200)]
        public string Sername { get; set; }
    }
}