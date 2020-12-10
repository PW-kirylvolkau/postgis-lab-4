using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;

namespace API.Repository
{
    public class VehicleRepository : AppRepository<Vehicle, ApplicationContext>
    {
        public VehicleRepository(ApplicationContext context) : base(context)
        {
            
        }

        public bool StationExists(int id)
        {
            return _context.Stations.Any(s => s.Id == id);
        }
    }
}