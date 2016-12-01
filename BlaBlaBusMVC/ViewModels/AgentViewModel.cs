using System.ComponentModel.DataAnnotations;
using BlaBlaBusMVC.Models;


namespace BlaBlaBusMVC.ViewModels
{
    public class AgentViewModel
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required]
        [MaxLength(200)]
        public string Sername { get; set; }

        public string FullName
        {
            get { return Name + ' ' + Sername; }
        }

        [Required]
        [MaxLength(200)]
        public string Phone { get; set; }

        public AgentViewModel()
        {
            
        }

        public AgentViewModel(Agent agent)
        {
            Id = agent.Id;
            Name = agent.Name;
            Sername = agent.Sername;
            Phone = agent.Phone;
        }
    }
}