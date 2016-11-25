using System;
using System.Collections.Generic;
using BlaBlaBusMVC.Models;

namespace BlaBlaBusMVC.ViewModels
{
    public class TripsViewModel
    {
        public TripsViewModel() { }

        public List<ClientViewModel> clients { set; get; }

        public DateTime date { get; set; }

        public DateTime arrivalDate { get; set; }

        public int cityTo { get; set; }

        public string cityToName { get; set; }

        public int cityFrom { get; set; }

        public string cityFromName { set; get; }

        public int busId { set; get; }

        public string busName { set; get; }

        public string comments { get; set; }
    }
}