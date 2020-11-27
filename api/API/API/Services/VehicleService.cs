using System.Collections.Generic;
using System.Linq;
using API.Data.Dao;
using API.Models;

namespace API.Services
{
    public class VehicleService
    {
        private readonly OrderDao _order;
        private readonly VehicleDao _vehicle;
        private readonly RouteDao _route;
        private readonly StationDao _station;
        
        public VehicleService(OrderDao order, VehicleDao vehicle, RouteDao route, StationDao station)
        {
            _order = order;
            _vehicle = vehicle;
            _route = route;
            _station = station;
        }

        public bool AppendRoute(Vehicle vehicle, Route route)
        {
            if (vehicle.Routes.Count == 0)
            {
                vehicle.Routes = new List<Route> {route};
            }
            else
            {
                vehicle.Routes.Add(route);
            }
            return _vehicle.Update(vehicle);
        }
    }
}