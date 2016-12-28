using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public byte[] Photo { get; set; }

        [NotMapped]
        public string FullName
        {
            get { return Name + " " + Sername; }
        }
    }
}