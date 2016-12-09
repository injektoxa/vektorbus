using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using BlaBlaBusMVC.Models;

namespace BlaBlaBusMVC.ViewModels
{
    public class ClientViewModel
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required]
        [MaxLength(200)]
        public string Phone { get; set; }

        public bool HasDiscount { get; set; }
        
        public bool HasDisability { get; set; }

        public bool HasMinorChild { get; set; }

        public string Comments { get; set; }

        public ClientViewModel()
        {

        }

        public ClientViewModel(Client client)
        {
            Id = client.Id;
            Name = client.Name;
            Phone = client.Phone;
            HasDiscount = client.HasDiscount;
            HasDisability = client.HasDisability;
            HasMinorChild = client.HasMinorChild;
            Comments = client.Comments;
        }
    }
}