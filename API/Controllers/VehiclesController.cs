using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Repository;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehiclesController : ControllerBase
    {
        private readonly RouteService _routeService;
        private readonly VehicleRepository _repository;
        
        public VehiclesController(VehicleRepository repository, RouteService routeService )
        {
            _routeService = routeService;
            _repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<Vehicle>> GetAll()
        {
            return await _repository.GetAll();
        }
        
        [HttpGet("{id}")]
        public async Task<Vehicle> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Vehicle vehicle)
        {
            Console.WriteLine(vehicle.ToString());
            if (!_repository.StationExists(vehicle.StationId))
            {
                return BadRequest(new
                {
                    error = new {message = "Provide correct station id."}
                });
            }
            var added = await _repository.Add(vehicle);
            _routeService.RecomputeRoutes();
            return CreatedAtAction(nameof(GetById), new {id = added.Id}, added);
        }
    }
}