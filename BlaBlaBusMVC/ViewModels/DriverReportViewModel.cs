namespace BlaBlaBusMVC.ViewModels
{
    public class DriverReportViewModel
    {
        public string TripDate { get; set; }

        public string CityFrom { get; set; }

        public string CityTo { get; set; }

        public string BusInfo { get; set; }

        public int ClientsCount { get; set; }

        public double CompulsoryExpenses { get; set; }

        public double? UnexpectedExpenses { get; set; }

        public double DriverCashBox { get; set; }

        public string DriverName { get; set; }

        public int DriverId { get; set; }

        public double TotalIncomes { get; set; }
    }
}