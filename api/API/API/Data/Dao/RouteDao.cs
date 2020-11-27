using System.Collections.Generic;
using System.Linq;
using API.Models;

namespace API.Data.Dao
{
    public class RouteDao : IDao<Route>
    {
        private readonly ApplicationContext _context;

        public RouteDao(ApplicationContext context)
        {
            _context = context;
        }
        
        public bool Add(Route obj)
        {
            _context.Routes.Add(obj);
            return Save();
        }

        public bool Update(Route obj)
        {
            _context.Routes.Update(obj);
            return Save();
        }

        public bool Delete(Route obj)
        {
            _context.Routes.Remove(obj);
            return Save();
        }

        public Route Get(int id)
        {
            throw new System.NotImplementedException();
        }

        public List<Route> GetAll()
        {
            return _context.Routes.ToList();
        }

        public bool Save()
        {
            return _context.SaveChanges() >= 0;
        }
    }
}