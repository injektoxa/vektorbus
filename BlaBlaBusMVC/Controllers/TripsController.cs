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

namespace BlaBlaBusMVC.Controllers
{
    [Authorize(Roles = "Admin, Driver, Partner, User")]
    public class TripsController : BaseApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Trips
        public IEnumerable<TripsViewModel> GetTrips(int? clientId = null)
        {
            var trips = new List<TripsViewModel>();
            var tripsdb = clientId == null
                ? db.Trips
                : db.Trips.Where(x => x.ClientTrip.Any(y => y.Client.Id == clientId));


            foreach (var item in tripsdb)
            {
                trips.Add(new TripsViewModel(item));
            }

            return trips;
        }

        // GET: api/Trips/5
        [ResponseType(typeof(TripsViewModel))]
        public IHttpActionResult GetTrip(int id)
        {
            var trip = db.Trips.Find(id);

            if (trip == null)
            {
                return NotFound();
            }

            var model = new TripsViewModel(trip);

            return Ok(model);
        }

        // PUT: api/Trips/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTrip(int id, TripsViewModel tripModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tripModel.id)
            {
                return BadRequest();
            }

            var trip = this.ConvertToTrip(tripModel);
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

            var tripdb = this.ConvertToTrip(trip);

            db.Trips.Add(tripdb);
            db.SaveChanges();

            var model = new TripsViewModel(tripdb);

            return CreatedAtRoute("DefaultApi", new { id = model.id }, model);
        }

        // DELETE: api/Trips/5
        [ResponseType(typeof(TripsViewModel))]
        public IHttpActionResult DeleteTrip(int id)
        {
            var trip = db.Trips.Find(id);
            if (trip == null)
            {
                return NotFound();
            }

            trip.ClientTrip.Clear();

            db.Entry(trip).State = EntityState.Modified;
            db.SaveChanges();

            db.Trips.Remove(trip);
            db.SaveChanges();

            var model = new TripsViewModel(trip);

            return Ok(model);
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

        private Trip ConvertToTrip(TripsViewModel trip)
        {
            var isnewTrip = trip.id == 0;
            var tripdb = isnewTrip ? new Trip() : db.Trips.Find(trip.id);

            tripdb.Bus = trip.bus != null
                ? db.Buses.First(b => b.Id == trip.bus.Id)
                : null;

            tripdb.Driver = trip.driver != null
                ? db.Drivers.First(b => b.Id == trip.driver.Id)
                : null;

            tripdb.Date = trip.date;
            tripdb.ArrivalDate = trip.arrivalDate;

            var clientsDb = new List<ClientTrip>();

            foreach (var item in trip.tripClients)
            {
                var clientTrip = item.Id == 0
                    ? new ClientTrip()
                    : db.ClientTrip.Find(item.Id);

                clientTrip.Client = db.Clients.First(i => i.Id == item.ClientId);
                clientTrip.From = db.Cities.First(i => i.Name == item.From);
                clientTrip.To = db.Cities.First(i => i.Name == item.To);
                clientTrip.Price = item.Price;
                clientTrip.IsStayInBus = item.IsStayInBus;
                clientTrip.HasBaggage = item.HasBaggage;

                clientTrip.Agent = item.AgentId != null
                    ? db.Agents.First(x => x.Id == item.AgentId)
                    : null;

                clientTrip.AgentPrice = item.AgentPrice;
                clientTrip.AdditionalExpenses = item.AdditionalExpenses;

                clientsDb.Add(clientTrip);
            }

            tripdb.ClientTrip?.Clear();
            tripdb.ClientTrip = clientsDb;

            tripdb.CityFrom = db.Cities.First(c => c.Id == trip.cityFrom.Id);
            tripdb.CityTo = db.Cities.First(c => c.Id == trip.cityTo.Id);
            tripdb.Comments = trip.comments;

            tripdb.JsonCompulsoryExpenses = JsonConvert.SerializeObject(trip.compulsoryExpenses);
            tripdb.JsonUnexpectedExpenses = JsonConvert.SerializeObject(trip.unexpectedExpenses);

            return tripdb;
        }
    }
}