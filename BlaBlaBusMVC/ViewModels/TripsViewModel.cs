using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using BlaBlaBusMVC.Models;

namespace BlaBlaBusMVC.ViewModels
{
    public class TripsViewModel
    {

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime DateTime { get; set; }

        public IEnumerable<SelectListItem> BusList { get; set; }

        public IEnumerable<SelectListItem> Clients { get; set; }

        public string BusName { set; get; }
    }
}