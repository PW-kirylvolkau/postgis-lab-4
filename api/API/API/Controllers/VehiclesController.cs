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
    public class VehicleController : ControllerBase
    {
        private readonly VehicleDao _dao;
        
        public VehicleController(VehicleDao dao)
        {
            _dao = dao;
        }

        [HttpGet]
        public IEnumerable<Vehicle> GetAll()
        {
            return _dao.GetAll().
        }
    }
}