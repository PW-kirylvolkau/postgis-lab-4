using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Models;

namespace API.Repository
{
    public class StationRepository : AppRepository<Station, ApplicationContext >
    {
        public StationRepository(ApplicationContext context) : base(context)
        {
            
        }
    }
}