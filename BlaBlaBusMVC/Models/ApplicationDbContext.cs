using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace BlaBlaBusMVC.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public IDbSet<Price> Prices { get; set; }

        public IDbSet<Driver> Drivers { get; set; }

        public IDbSet<Client> Clients { get; set; }

        public IDbSet<Trip> Trips { set; get; }

        public IDbSet<Bus> Buses { set; get; }

        public IDbSet<City> Cities { get; set; }

        public IDbSet<CityPrice> CityPrices { get; set; }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}