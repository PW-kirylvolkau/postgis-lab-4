using System.Collections.Generic;
using API.Data.Dao;
using API.Models;

namespace API.Services
{
    public class RouteService
    {
        private readonly OrderDao _order;
        private readonly VehicleDao _vehicle;
        private readonly RouteDao _route;
        private readonly StationDao _station;
        private readonly VehicleService _vehicleService;
        
        public RouteService(
            OrderDao order, 
            VehicleDao vehicle, 
            RouteDao route, 
            StationDao station,
            VehicleService vehicleService
        )
        {
            _order = order;
            _vehicle = vehicle;
            _route = route;
            _station = station;
            _vehicleService = vehicleService;
        }

        public void RecomputeRoutes()
        {
            var idx = 0;
            var orders = _order.GetAll();
            var takenCapacity = 0.0;
            foreach (var vehicle in _vehicle.GetAll())
            {
                
                while (takenCapacity <= vehicle.Capacity && idx < orders.Count)
                {
                    _route.Add(new Route {Order = orders[idx]});
                    var route = _route
                        .GetAll()
                        .Find(r => r.Order.Id == orders[idx].Id);
                    if (!_vehicleService.AppendRoute(vehicle, route));
                    takenCapacity += orders[idx].PackageWeight;
                    idx++;

                }
            }
        }
    }
}