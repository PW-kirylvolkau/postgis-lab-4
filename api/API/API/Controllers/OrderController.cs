using System.Collections.Generic;
using API.Data.Dao;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderDao _dao;

        public OrderController(OrderDao dao)
        {
            _dao = dao;
        }

        [HttpGet]
        public IEnumerable<Order> GetAll()
        {
            return _dao.GetAll();
        }

        [HttpPost]
        public ActionResult Add([FromBody] Order order)
        {
            if (!_dao.Add(order)) return BadRequest();
            return Ok();
        }
        /// <summary>
        /// So, if our server when trying to delete the existing order gives us an error it means that the server is...
        /// a teapot.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var order = _dao.Get(id);
            if (order == null) return NotFound();
            
            return _dao.Delete(order) ? NoContent() : StatusCode(418);
        }
        
    }
}