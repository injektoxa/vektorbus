using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using BlaBlaBusMVC.Models;
using BlaBlaBusMVC.ViewModels;

namespace BlaBlaBusMVC.Controllers
{
    //[Authorize(Roles = "Admin")]
    public class ClientTripsController : BaseApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/ClientTrips
        public IEnumerable<ClientTripViewModel> GetClientTrips(string filter = null)
        {
            var query = string.IsNullOrEmpty(filter)
                ? db.Clients
                : db.Clients.Where(x => x.Name.Contains(filter) || x.Phone.Contains(filter));


            var clients = query.Select(s => new ClientTripViewModel()
            {
                Phone = s.Phone,
                Name = s.Name,
                ClientId = s.Id,
                Comments = s.Comments,
                HasDiscount = s.HasDiscount,
                HasDisability = s.HasDisability,
                HasMinorChild = s.HasMinorChild
            }).ToList();

            return clients;
        }

        public IHttpActionResult PostClientTrip(ClientTripViewModel clientTrip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var tripId = int.Parse(clientTrip.TripId);
                var cityFrom = int.Parse(clientTrip.From);
                var cityTo = int.Parse(clientTrip.To);
                var clientTripdb = new ClientTrip()
                {
                    Trip = db.Trips.First(t => t.Id == tripId),
                    Agent = db.Agents.First(t => t.Id == clientTrip.AgentId),
                    AgentPrice = clientTrip.AgentPrice,
                    Client = db.Clients.First(c => c.Id == clientTrip.ClientId),
                    From = db.Cities.First(c => c.Id == cityFrom),
                    To = db.Cities.First(c => c.Id == cityTo),
                    HasBaggage = clientTrip.HasBaggage,
                    IsStayInBus = clientTrip.IsStayInBus,
                    Price = clientTrip.Price,
                };

                var res = db.ClientTrip.Add(clientTripdb);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new {id = res.Id}, clientTrip);
            }
            catch
            {
                return BadRequest();
            }
        }

        //DELETE: api/Trips/5
        public IHttpActionResult DeleteClientTrip(int id)
        {
            var clientTrip = db.ClientTrip.Find(id);
            if (clientTrip == null)
            {
                return NotFound();
            }

            db.ClientTrip.Remove(clientTrip);
            db.SaveChanges();

            return Ok();
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