using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Dao;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StationController : ControllerBase
    {
        private readonly StationDao _dao;

        public StationController(StationDao dao)
        {
            _dao = dao;
        }

        [HttpGet]
        public IEnumerable<Station> GetAll()
        {
            return _dao.GetAll();
        }

        [HttpPost]
        public ActionResult Add([FromBody] Station station)
        {
            return _dao.Add(station) ? Ok() : StatusCode(400);
        }
        
    }
}