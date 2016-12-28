using System.ComponentModel.DataAnnotations;

namespace BlaBlaBusMVC.ViewModels
{
    public class ApplicationUserViewModel
    {
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}