using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using API.Models;
using API.Repository;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/Orders")]
    public class OrdersController : ControllerBase
    {
        private readonly RouteService _routeService;
        private readonly OrderRepository _repository;

        public OrdersController(RouteService routeService, OrderRepository repository)
        {
            _routeService = routeService;
            _repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<Order>> GetAll()
        {
            return await _repository.GetAll();
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Order order)
        {
            var added = await _repository.Add(order);
            if (added == null)
            {
                return BadRequest();
            }
            await _routeService.RecomputeRoutes();
            return CreatedAtAction(nameof(GetById), new {id = added.Id}, added);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _repository.Delete(id);
            if (deleted == null)
            {
                return BadRequest();
            }
            await _routeService.RecomputeRoutes();
            return StatusCode(200);
        }

        [HttpGet("{id}")]
        public async Task<Order> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder([FromBody] Order order)
        {
            var updated = await _repository.Update(order);
            if (updated == null)
            {
                return BadRequest();
            }
            await _routeService.RecomputeRoutes();
            return StatusCode(204);
        }
        
    }
}