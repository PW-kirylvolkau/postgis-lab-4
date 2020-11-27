using System.Collections.Generic;
using API.Models;

namespace API.Data.Dao
{
    public class RouteDao : IDao<Route>
    {
        private ApplicationContext _context;

        public RouteDao(ApplicationContext context)
        {
            _context = context;
        }
        
        public bool Add(Route obj)
        {
            throw new System.NotImplementedException();
        }

        public bool Update(Route obj)
        {
            throw new System.NotImplementedException();
        }

        public bool Delete(Route obj)
        {
            throw new System.NotImplementedException();
        }

        public Route Get(int id)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<Route> GetAll()
        {
            throw new System.NotImplementedException();
        }

        public bool Save()
        {
            throw new System.NotImplementedException();
        }
    }
}