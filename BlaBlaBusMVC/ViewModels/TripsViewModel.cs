using System;
using System.Collections.Generic;
using BlaBlaBusMVC.Models;
using System.Linq;

namespace BlaBlaBusMVC.ViewModels
{
    public class TripsViewModel
    {
        public int id { set; get; }

        public List<ClientTripViewModel> tripClients { set; get; }

        public DateTime date { get; set; }

        public DateTime arrivalDate { get; set; }

        public City cityTo { get; set; }

        public City cityFrom { get; set; }

        public Bus bus { set; get; }

        public Driver driver { set; get; }

        public string comments { get; set; }

        public double compulsoryExpenses { get; set; }

        public double? unexpectedExpenses { get; set; }

        public string unexpectedExpensesComments { get; set; }

        public TripsViewModel()
        {
            
        }

        public TripsViewModel(Trip trip)
        {
            id = trip.Id;
            bus = trip.Bus;
            driver = trip.Driver;
            cityFrom = trip.CityFrom;
            cityTo = trip.CityTo;
            date = trip.Date;
            arrivalDate = trip.ArrivalDate;
            tripClients = trip.ClientTrip.Select(i => new ClientTripViewModel(i)).ToList();
            comments = trip.Comments;
            compulsoryExpenses = trip.CompulsoryExpenses;
            unexpectedExpenses = trip.UnexpectedExpenses;
            unexpectedExpensesComments = trip.UnexpectedExpensesComments;
        }
    }
}