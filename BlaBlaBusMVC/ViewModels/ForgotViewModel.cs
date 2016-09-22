using System.ComponentModel.DataAnnotations;

namespace BlaBlaBusMVC.ViewModels
{
    public class ForgotViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}