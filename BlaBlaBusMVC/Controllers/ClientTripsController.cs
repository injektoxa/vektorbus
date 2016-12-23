using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using BlaBlaBusMVC.Models;
using BlaBlaBusMVC.ViewModels;

namespace BlaBlaBusMVC.Controllers
{
    [Authorize(Roles = "Admin")]
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