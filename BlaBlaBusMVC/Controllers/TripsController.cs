using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using BlaBlaBusMVC.Models;
using BlaBlaBusMVC.ViewModels;
using Newtonsoft.Json;
using System.Data.Entity;
using WebGrease.Css.Extensions;

namespace BlaBlaBusMVC.Controllers
{
    //[Authorize(Roles = "Admin, Driver, Partner, User")]
    public class TripsController : BaseApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Trips
        public IEnumerable<TripsViewModel> GetTrips()
        {
            var trips = db.Trips.Select(e => new TripsViewModel
            {
                date = e.Date,
                arrivalDate = e.ArrivalDate,
                bus = e.Bus.FriendlyName,
                cityFrom = e.CityFrom.Name,
                cityTo = e.CityTo.Name,
                comments = e.Comments,
                driver = e.Driver.Name,
                id = e.Id,
            });
            return trips.AsEnumerable();
        }

        [HttpGet]
        public IEnumerable<ClientTripViewModel> GetTripDetail(int tripId)
        {
            var clientTrip = db.ClientTrip.Where(t => t.Trip.Id == tripId);
            var clientTrips = clientTrip.Select(t => new ClientTripViewModel()
            {
                Id = t.Id,
                ClientId = t.Client.Id,
                Name = t.Client.Name,
                Comments = t.Client.Comments,
                HasDiscount = t.Client.HasDiscount,
                Phone = t.Client.Phone,
                From = t.From.Name,
                AgentName = t.Agent.Name,
                To = t.To.Name,
                Price = t.Price,
                IsStayInBus = t.IsStayInBus,
                HasBaggage = t.HasBaggage,
                AgentId = t.Agent.Id,
                AgentPrice = t.AgentPrice,
                AdditionalExpenses = t.AdditionalExpenses,
                HasDisability = t.Client.HasDisability,
                HasMinorChild = t.Client.HasMinorChild,
            });

            return clientTrips.AsEnumerable();
        }

        //public IEnumerable<TripsViewModel> GetTrips(string query)
        //{
        //    var trips = new List<TripsViewModel>();
        //    IQueryable<Trip> tripsdb;
        //    if (string.IsNullOrEmpty(query))
        //    {
        //        tripsdb = db.Trips.Take(20);
        //    }
        //    else
        //    {
        //        if (query.Contains('.'))
        //        {
        //            var date = query.Split('.');
        //            var day = date[1];
        //            var month = date[0];
        //            tripsdb = db.Trips.Where(x => x.Date.Day.ToString() == day
        //                                          && x.Date.Month.ToString() == month);
        //        }
        //        else
        //        {
        //            tripsdb = db.Trips.Where(x =>
        //                x.Driver.Name.Contains(query) ||
        //                x.Bus.FriendlyName.Contains(query) ||
        //                x.ClientTrip.Any(y => y.Client.Name.Contains(query) ||
        //                x.ClientTrip.Any(z => z.Client.Phone.Contains(query)
        //             )));
        //        }
        //    }
        //    foreach (var item in tripsdb)
        //    {
        //        trips.Add(new TripsViewModel(item));
        //    }

        //    return trips.OrderByDescending(i => i.date);
        //}

        //// GET: api/Trips/5
        //[ResponseType(typeof(TripsViewModel))]
        //public IHttpActionResult GetTrip(int id)
        //{
        //    var trip = db.Trips.Find(id);

        //    if (trip == null)
        //    {
        //        return NotFound();
        //    }

        //    var model = new TripsViewModel(trip);

        //    return Ok(model);
        //}

        //PUT: api/Trips/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutTrip(int id, TripsViewModel tripModel)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != tripModel.id)
        //    {
        //        return BadRequest();
        //    }

        //    var trip = this.ConvertToTrip(tripModel);
        //    db.Entry(trip).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!TripExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        //POST: api/Trips
        [ResponseType(typeof(TripsViewModel))]
        public IHttpActionResult PostTrip(TripsViewModel trip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int busId = int.Parse(trip.bus);
            int cityFromId = int.Parse(trip.cityFrom);
            int cityTo = int.Parse(trip.cityTo);
            int driverId = int.Parse(trip.driver);

            var tripdb = new Trip()
            {
                ArrivalDate = trip.arrivalDate,
                Bus = db.Buses.First(b => b.Id == busId),
                CityFrom = db.Cities.First(c => c.Id == cityFromId),
                CityTo = db.Cities.First(c => c.Id == cityTo),
                Comments = trip.comments,
                Driver = db.Drivers.First(d => d.Id == driverId),
                Date = trip.date,
            };

            var res = db.Trips.Add(tripdb);
            db.SaveChanges();

            //var model = new TripsViewModel(tripdb);

            return CreatedAtRoute("DefaultApi", new { id = res.Id }, trip);
        }

        // DELETE: api/Trips/5
        //[ResponseType(typeof(TripsViewModel))]
        //public IHttpActionResult DeleteTrip(int id)
        //{
        //    var trip = db.Trips.Find(id);
        //    if (trip == null)
        //    {
        //        return NotFound();
        //    }

        //    trip.ClientTrip.Clear();

        //    db.Entry(trip).State = EntityState.Modified;
        //    db.SaveChanges();

        //    db.Trips.Remove(trip);
        //    db.SaveChanges();

        //    var model = new TripsViewModel(trip);

        //    return Ok(model);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }

            base.Dispose(disposing);
        }

        private bool TripExists(int id)
        {
            return db.Trips.Count(e => e.Id == id) > 0;
        }

        //private Trip ConvertToTrip(TripsViewModel trip)
        //{
        //    var isnewTrip = trip.id == 0;
        //    var tripdb = isnewTrip ? new Trip() : db.Trips.Find(trip.id);

        //    tripdb.Bus = trip.bus != null
        //        ? db.Buses.First(b => b.Id == trip.bus.Id)
        //        : null;

        //    tripdb.Driver = trip.driver != null
        //        ? db.Drivers.First(b => b.Id == trip.driver.Id)
        //        : null;

        //    tripdb.Date = trip.date;
        //    tripdb.ArrivalDate = trip.arrivalDate;

        //    var clientsDb = new List<ClientTrip>();

        //    foreach (var item in trip.tripClients)
        //    {
        //        var clientTrip = item.Id == 0
        //            ? new ClientTrip()
        //            : db.ClientTrip.Find(item.Id);

        //        clientTrip.Client = db.Clients.First(i => i.Id == item.ClientId);
        //        clientTrip.From = db.Cities.First(i => i.Name == item.From);
        //        clientTrip.To = db.Cities.First(i => i.Name == item.To);
        //        clientTrip.Price = item.Price;
        //        clientTrip.IsStayInBus = item.IsStayInBus;
        //        clientTrip.HasBaggage = item.HasBaggage;

        //        clientTrip.Agent = item.AgentId != null
        //            ? db.Agents.First(x => x.Id == item.AgentId)
        //            : null;

        //        clientTrip.AgentPrice = item.AgentPrice;
        //        clientTrip.AdditionalExpenses = item.AdditionalExpenses;

        //        clientsDb.Add(clientTrip);
        //    }

        //    tripdb.ClientTrip?.Clear();
        //    tripdb.ClientTrip = clientsDb;

        //    tripdb.CityFrom = db.Cities.First(c => c.Id == trip.cityFrom.Id);
        //    tripdb.CityTo = db.Cities.First(c => c.Id == trip.cityTo.Id);
        //    tripdb.Comments = trip.comments;

        //    //tripdb.JsonCompulsoryExpenses = JsonConvert.SerializeObject(trip.compulsoryExpenses.Where(x => x.Cost != null));
        //    //tripdb.JsonUnexpectedExpenses = JsonConvert.SerializeObject(trip.unexpectedExpenses.Where(x => x.Cost != null));

        //    return tripdb;
        //}
    }
}