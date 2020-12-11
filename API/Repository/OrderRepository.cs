using API.Data;
using API.Models;

namespace API.Repository
{
    public class OrderRepository : AppRepository<Order, ApplicationContext>
    {
        public OrderRepository(ApplicationContext context) : base(context)
        {
            
        }
    }
}