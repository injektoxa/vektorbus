﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlaBlaBusMVC.ViewModels
{
    public class AgentReportViewModel
    {
        public string TripDate { get; set; }

        public string CityFrom { get; set; }

        public string CityTo { get; set; }

        public string BusInfo { get; set; }

        public string DriverInfo { get; set; }

        public int ClientsCount { get; set; }

        public double? AgentCompensation { get; set; }
    }
}