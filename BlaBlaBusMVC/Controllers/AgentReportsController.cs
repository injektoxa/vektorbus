using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using BlaBlaBusMVC.Models;
using BlaBlaBusMVC.ViewModels;

namespace BlaBlaBusMVC.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AgentReportsController : BaseApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/AgentReports
        public IEnumerable<AgentReportViewModel> GetAgentReports(int id, DateTime dateFrom, DateTime dateTo)
        {
            dateFrom = dateFrom.Date;
            dateTo = new DateTime(dateTo.Year, dateTo.Month, dateTo.Day, 23, 59, 59);
            var clientTrips = db.ClientTrip.Where(x =>
                x.Trip.Date >= dateFrom &&
                x.Trip.Date <= dateTo &&
                x.Agent.Id == id).ToList();

            var reports = CreateAgentReports(clientTrips);

            return reports;
        }

        private List<AgentReportViewModel> CreateAgentReports(List<ClientTrip> clientTrips)
        {
            var reports = clientTrips.GroupBy(x => x.Trip)
                .Select(group => new AgentReportViewModel()
                {
                    TripDate = group.Key.Date.ToString("yyyy-MM-dd hh:mm"),
                    BusInfo = group.Key.Bus!= null 
                        ? group.Key.Bus.FriendlyName + " " + group.Key.Bus.RegistrationNumber 
                        : string.Empty,
                    DriverInfo = group.Key.Driver != null 
                        ? group.Key.Driver.FullName
                        : string.Empty,
                    CityFrom = group.Key.CityFrom.Name,
                    CityTo = group.Key.CityTo.Name,
                    ClientsCount = group.Count(),
                    AgentCompensation = group.Sum(x => x.AgentPrice)
                }).ToList();
            return reports;
        }
    }
}
