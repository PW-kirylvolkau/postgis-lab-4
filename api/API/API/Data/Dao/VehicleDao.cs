using System.Collections.Generic;
using System.Linq;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Dao
{
    public class VehicleDao : IDao<Vehicle>
    {
        private readonly ApplicationContext _context;

        public VehicleDao(ApplicationContext context)
        {
            _context = context;
        }
        
        public bool Add(Vehicle obj)
        {
            _context.Vehicles.Add(obj);
            return Save();
        }

        public bool Update(Vehicle obj)
        {
            _context.Vehicles.Update(obj);
            return Save();
        }

        public bool Delete(Vehicle obj)
        {
            throw new System.NotImplementedException();
        }

        public Vehicle Get(int id)
        {
            return _context.Vehicles.FirstOrDefault(v => v.Id == id);
        }

        public IEnumerable<Vehicle> GetAll()
        {
            return _context.Vehicles.Include(e => e.Routes);
        }

        public bool Save()
        {
            return _context.SaveChanges() >= 0;
        }
    }
}