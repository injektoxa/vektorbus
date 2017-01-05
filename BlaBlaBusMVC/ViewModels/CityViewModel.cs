﻿using BlaBlaBusMVC.Models;

namespace BlaBlaBusMVC.ViewModels
{
    public class CityViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool HasRelatedEntities { get; set; }
    }
}