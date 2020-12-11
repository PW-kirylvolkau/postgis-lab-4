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

        public VehicleService(VehicleRepository vehicle)
        {
            _vehicle = vehicle;
        }

        public async Task<bool> AppendRoute(Vehicle vehicle, Route route)
        {
            if (vehicle.Routes.Count == 0)
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
            vehicle.Routes = new List<Route>();
            return await _vehicle.Update(vehicle) == null;
        }
    }
}