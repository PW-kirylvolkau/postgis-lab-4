using System.Collections.Generic;
using System.Linq;
using API.Models;

namespace API.Data.Dao
{
    public class OrderDao : IDao<Order>
    {
        private readonly ApplicationContext _context;

        public OrderDao(ApplicationContext context)
        {
            _context = context;
        }
        
        public bool Add(Order obj)
        {
            _context.Orders.Add(obj);
            return Save();
        }

        public bool Update(Order obj)
        {
            _context.Orders.Add(obj);
            return Save();
        }

        public bool Delete(Order obj)
        {
            _context.Orders.Remove(obj);
            return Save();
        }

        public Order Get(int id)
        {
            return _context.Orders.FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Order> GetAll()
        {
            return _context.Orders.ToList();
        }

        public bool Save()
        {
            return _context.SaveChanges() >= 0;
        }
    }
}