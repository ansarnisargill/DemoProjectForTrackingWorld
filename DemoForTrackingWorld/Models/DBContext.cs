using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace DemoForTrackingWorld.Models
{
    public class FleetContext:DbContext
    {
        public FleetContext() : base("FleetContext")
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<FleetContext>());
        }
        public  DbSet<Vehicle> Vehicles { get; set; }

    }
}