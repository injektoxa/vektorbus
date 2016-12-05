using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BlaBlaBusMVC.Models;
using BlaBlaBusMVC.ViewModels;

namespace BlaBlaBusMVC.Controllers
{
    public class ClientTripsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/ClientTrips
        public IEnumerable<ClientTripViewModel> GetClientTrips()
        {
            var clients = db.Clients.Select(s => new ClientTripViewModel()
            {
                Phone = s.Phone,
                Name = s.Name,
                Id = s.Id,
                Comments = s.Comments,
                HasDiscount = s.HasDiscount
            }).ToList();

            return clients;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}