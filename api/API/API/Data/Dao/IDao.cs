using System.Collections.Generic;

namespace API.Data.Dao
{
    public interface IDao<T> 
    where T: class
    {
        public bool Add(T obj);
        public bool Update(T obj);
        public bool Delete(T obj);
        public T Get(int id);
        public IEnumerable<T> GetAll();
        public bool Save();
    }
}