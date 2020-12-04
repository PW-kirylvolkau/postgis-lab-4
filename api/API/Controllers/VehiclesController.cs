using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Dao;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("api/Vehicle")]
    public class VehicleController : ControllerBase
    {
        private readonly VehicleDao _dao;
        private readonly RouteService _routeService;
        
        public VehicleController(VehicleDao dao,RouteService routeService )
        {
            _dao = dao;
            _routeService = routeService;
        }

        [HttpGet]
        public IEnumerable<Vehicle> GetAll()
        {
            return _dao.GetAll();
        }

        [HttpPost]
        public ActionResult Add([FromBody] Vehicle vehicle)
        {
            var res = _dao.Add(vehicle) ? Ok() : StatusCode(400);
            _routeService.RecomputeRoutes();
            return res;
        }
    }
}