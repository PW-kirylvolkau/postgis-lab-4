using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Repository;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StationsController : ControllerBase
    {
        private readonly StationRepository _repository;

        public StationsController(StationRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<Station>> GetAll()
        {
            return await _repository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<Station> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Station station)
        {
            var added = await _repository.Add(station);
            if (added == null)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(GetById), new {id = added.Id}, added);
        }
        
    }
}