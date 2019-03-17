using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TrackingWorldDemo.Models;

namespace TrackingWorldDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly FleetContext db;
        public VehicleController(FleetContext context)
        {
            db = context;
            if (db.vehicles.Count() == 0)
            {
                Vehicle vehicle = new Vehicle();
                vehicle.RegNo="Test Reg";
                vehicle.Active = true;
                vehicle.ChasisNo = "12ab";
                vehicle.Color = "Red";
                vehicle.DateOfPurchase = DateTime.Now;
                vehicle.EngineNo = "12ab";
                vehicle.Make = "12ab";
                vehicle.Model = "12ab";
                db.vehicles.Add(vehicle);
                db.SaveChanges();
            }
        }
        [HttpGet]
        public ActionResult<IEnumerable<Vehicle>> Get()
        {
            return db.vehicles;
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var v = db.vehicles.Find(id);
            if (v != null)
            {
                return Ok(v);
            }
            else
            {
                return NotFound();
            }
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] Vehicle vehicle)
        {
            try
            {

                vehicle.VehicleID = db.vehicles.Max(x => x.VehicleID) + 1;
                db.vehicles.Add(vehicle);
                db.SaveChanges();
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var vehicle=db.vehicles.Find(id);
            db.vehicles.Remove(vehicle);
            db.SaveChanges();
        }
        [HttpOptions]
        public IActionResult Options()
        {
           return Ok();
        }
    }
}
