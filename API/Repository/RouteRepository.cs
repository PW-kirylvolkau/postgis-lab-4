using API.Data;
using API.Models;

namespace API.Repository
{
    public class RouteRepository : AppRepository<Route, ApplicationContext>
    {
        public RouteRepository(ApplicationContext context) : base(context)
        {
            
        }
    }
}