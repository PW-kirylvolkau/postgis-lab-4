using System.Collections.Generic;
using System.Linq;
using API.Models;

namespace API.Data.Dao
{
    public class StationDao : IDao<Station>
    {
        private readonly ApplicationContext _context;

        public StationDao(ApplicationContext context)
        {
            _context = context;
        }
        
        public bool Add(Station obj)
        {
            _context.Stations.Add(obj);
            return Save();
        }

        public bool Update(Station obj)
        {
            throw new System.NotImplementedException();
        }

        public bool Delete(Station obj)
        {
            throw new System.NotImplementedException();
        }

        public Station Get(int id)
        {
            return _context.Stations.FirstOrDefault(s => s.Id == id);
        }

        public List<Station> GetAll()
        {
            return _context.Stations.ToList();
        }

        public bool Save()
        {
            return _context.SaveChanges() >= 0;
        }
    }
}