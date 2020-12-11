using System.Collections.Generic;
using API.Models;
using API.Repository;

namespace API.Services
{
    public class RouteService
    {
        private readonly OrderRepository _order;
        private readonly VehicleRepository _vehicle;
        private readonly RouteRepository _route;
        private readonly VehicleService _vehicleService;
        
        public RouteService(
            OrderRepository order, 
            VehicleRepository vehicle, 
            RouteRepository route,
            VehicleService vehicleService
        )
        {
            _order = order;
            _vehicle = vehicle;
            _route = route;
            _vehicleService = vehicleService;
        }

        public async void ClearRoutes()
        {
            foreach (var route in await _route.GetAll())
            {
                await _route.Delete(route.Id);
            }
        }

        public async void RecomputeRoutes()
        {
            var idx = 0;
            var orders = await _order.GetAll();
            var takenCapacity = 0.0;
            foreach (var vehicle in await _vehicle.GetAll())
            {
                await _vehicleService.ResetRoutes(vehicle);
                while (takenCapacity < vehicle.Capacity && idx < orders.Count-1)
                {
                   await _route.Add(new Route {Order = orders[idx]});
                   var routeList =  await _route.GetAll();
                   var route = routeList.Find(r => r.Order.Id == orders[idx].Id);
                   await _vehicleService.AppendRoute(vehicle, route);
                   takenCapacity += orders[idx].PackageWeight;
                   idx++;
                }

                takenCapacity = 0;
            }
        }
    }
}