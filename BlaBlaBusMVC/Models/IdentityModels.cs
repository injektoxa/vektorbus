using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BlaBlaBusMVC.Models
{
    public class Entity
    {
        [Key]
        public int Id { get; set; }
    }

    public class Bus : Entity
    {
        [MaxLength(100)]
        [Required]
        public string RegistrationNumber { get; set; }

        public int PlacesCount { get; set; }
    }

    public class Trip : Entity
    {
        public virtual List<Price> Price { get; set; }

        public virtual Bus Bus { get; set; }

        public DateTime Date { get; set; }

        public virtual List<Client> Clients { get; set; }
    }

    public class City : Entity
    {
        public string Name { get; set; }
    }

    public class CityPrice : Entity
    {
        public City CityFrom { get; set; }

        public City CityTo { get; set; }

        public double Price { get; set; }
    }

    public class Client : Entity
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        public virtual List<Trip> Trips { get; set; }

        [Required]
        [MaxLength(200)]
        public string Phone { get; set; }
    }

    public class Driver : Entity
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        [MaxLength(200)]
        public string Phone { get; set; }

        [MaxLength(200)]
        public string Sername { get; set; }
    }

    public class Price : Entity
    {
        public virtual double PriceForTrip { get; set; }

        public virtual Client Client { get; set; }

        public virtual Trip Trip { get; set; }
    }
}