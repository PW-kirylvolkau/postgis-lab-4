using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Repository;

namespace API.Services
{
    public class VehicleService
    {
        private readonly VehicleRepository _vehicle;
        private readonly RouteRepository _route;

        public VehicleService(VehicleRepository vehicle, RouteRepository route)
        {
            _vehicle = vehicle;
            _route = route;
        }

        public async Task<bool> AppendRoute(Vehicle vehicle, Route route)
        {
            if (vehicle.Routes == null)
            {
                vehicle.Routes = new List<Route> {route};
            }
            else
            {
                vehicle.Routes.Add(route);
            }
            return await _vehicle.Update(vehicle) == null;
        }

        public async Task<bool> ResetRoutes(Vehicle vehicle)
        {
            if (vehicle.Routes != null)
            {
                foreach (var route in vehicle.Routes)
                {
                    await _route.Delete(route.Id);
                }
            }
            else
            {
                vehicle.Routes = new List<Route>();
            }
            return await _vehicle.Update(vehicle) == null;
        }
    }
}