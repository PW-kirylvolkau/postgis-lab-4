using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class VehicleRepository : AppRepository<Vehicle, ApplicationContext>
    {
        public VehicleRepository(ApplicationContext context) : base(context)
        {
            
        }

        public bool StationExists(int id)
        {
            return Context.Stations.Any(s => s.Id == id);
        }

        public new async Task<List<Vehicle>> GetAll()
        {
            return await Context.Vehicles
                .Include(v => v.Station)
                .ToListAsync();

        }
    }
}