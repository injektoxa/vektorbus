using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using BlaBlaBusMVC.Models;
using BlaBlaBusMVC.ViewModels;

namespace BlaBlaBusMVC.Controllers
{
    public class TripsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Trips
        public IEnumerable<TripsViewModel> GetTrips()
        {
            List<TripsViewModel> trips = new List<TripsViewModel>();
            var tripsdb = db.Trips;

            foreach (var item in tripsdb)
            {
                trips.Add(new TripsViewModel()
                {
                    busName = item.Bus.FriendlyName,
                    cityFromName = item.CityFrom.Name,
                    cityToName = item.CityTo.Name,
                    date = item.Date,
                    arrivalDate = item.ArrivalDate,
                    clients = item.ClientTrip.Select(i =>
                    new ClientViewModel()
                    {
                        Name = i.Client.Name,
                        Comments = i.Client.Comments,
                        HasDiscount = i.Client.HasDiscount,
                        Phone = i.Client.Phone,
                        From = i.From.Name,
                        To = i.To.Name,
                        Price = i.Price,
                        IsStayInBus = i.IsStayInBus,
                        HasBaggage = i.HasBaggage,
                        AgentId = i.Agent?.Id,
                        AgentPrice = i.AgentPrice,
                        AdditionalExpenses = i.AdditionalExpenses
                    }).ToList(),
                    comments = item.Comments
                });
            }

            return trips;
        }

        // GET: api/Trips/5
        [ResponseType(typeof(Trip))]
        public IHttpActionResult GetTrip(int id)
        {
            Trip trip = db.Trips.Find(id);
            if (trip == null)
            {
                return NotFound();
            }

            return Ok(trip);
        }

        // PUT: api/Trips/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTrip(int id, Trip trip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != trip.Id)
            {
                return BadRequest();
            }

            db.Entry(trip).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TripExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Trips
        [ResponseType(typeof(TripsViewModel))]
        public IHttpActionResult PostTrip(TripsViewModel trip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Trip tripdb = new Trip();
            tripdb.Bus = db.Buses.First(b => b.Id == trip.busId);
            tripdb.Date = trip.date;
            tripdb.ArrivalDate = trip.arrivalDate;

            List<ClientTrip> clientsDb = new List<ClientTrip>();
            foreach (var item in trip.clients)
            {
                ClientTrip clientTrip = new ClientTrip();
                clientTrip.Client = db.Clients.First(i => i.Id == item.Id);
                clientTrip.From = db.Cities.First(i => i.Name == item.From);
                clientTrip.To = db.Cities.First(i => i.Name == item.To);
                clientTrip.Price = item.Price;
                clientTrip.IsStayInBus = item.IsStayInBus;
                clientTrip.HasBaggage = item.HasBaggage;
                clientTrip.Agent = db.Agents.First(x => x.Id == item.AgentId);
                clientTrip.AgentPrice = item.AgentPrice;
                clientTrip.AdditionalExpenses = item.AdditionalExpenses;

                clientsDb.Add(clientTrip);
            }

            tripdb.ClientTrip = clientsDb;
            tripdb.CityFrom = db.Cities.First(c => c.Id == trip.cityFrom);
            tripdb.CityTo = db.Cities.First(c => c.Id == trip.cityTo);
            tripdb.Comments = trip.comments;

            db.Trips.Add(tripdb);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tripdb.Id }, trip);
        }

        // DELETE: api/Trips/5
        [ResponseType(typeof(Trip))]
        public IHttpActionResult DeleteTrip(int id)
        {
            Trip trip = db.Trips.Find(id);
            if (trip == null)
            {
                return NotFound();
            }

            db.Trips.Remove(trip);
            db.SaveChanges();

            return Ok(trip);
        }

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
    }
}