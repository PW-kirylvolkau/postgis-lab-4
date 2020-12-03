using System.Collections.Generic;
using API.Data.Dao;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly OrderDao _dao;
        private readonly RouteService _routeService;

        public OrdersController(OrderDao dao, RouteService routeService)
        {
            _dao = dao;
            _routeService = routeService;
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
            _routeService.RecomputeRoutes();
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
            var res = _dao.Delete(order) ? NoContent() : StatusCode(418);
            _routeService.RecomputeRoutes();
            return res;
        }
        
    }
}