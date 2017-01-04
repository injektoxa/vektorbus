using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using BlaBlaBusMVC.Models;
using BlaBlaBusMVC.ViewModels;

namespace BlaBlaBusMVC.Controllers
{
    [Authorize(Roles = "Admin")]
    public class DriverReportsController : BaseApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/AgentReports
        public IEnumerable<DriverReportViewModel> GetDriverReports(int id, DateTime dateFrom, DateTime dateTo)
        {
            dateFrom = dateFrom.Date;
            dateTo = new DateTime(dateTo.Year, dateTo.Month, dateTo.Day, 23, 59, 59);

            var trips = db.Trips.Where(x => x.Date >= dateFrom &&
                x.ArrivalDate <= dateTo && x.Driver.Id == id).ToList();

            var reports = CreateDriverReports(trips);

            return reports;
        }

        private static List<DriverReportViewModel> CreateDriverReports(List<Trip> trips)
        {
            var reports = trips.Select(x =>
            {
                var unexpectedExpenses = x.UnexpectedExpenses.Sum(e => e.Cost);
                var compulsoryExpenses = x.CompulsoryExpenses.Sum(e => e.Cost);
                var allIncomes = x.ClientTrip.Sum(c => c.Price - (c.AgentPrice ?? 0));

                return new DriverReportViewModel()
                {
                    TripDate = x.Date.ToString("yyyy-MM-dd hh:mm"),
                    BusInfo = x.Bus != null ? $"{x.Bus.FriendlyName} {x.Bus.RegistrationNumber}" : string.Empty,
                    CityFrom = x.CityFrom.Name,
                    CityTo = x.CityTo.Name,
                    ClientsCount = x.ClientTrip.Count,
                    UnexpectedExpenses = unexpectedExpenses,
                    CompulsoryExpenses = compulsoryExpenses,
                    DriverCashBox = allIncomes - unexpectedExpenses - compulsoryExpenses,
                };
            }).ToList();

            return reports;
        }
    }
}