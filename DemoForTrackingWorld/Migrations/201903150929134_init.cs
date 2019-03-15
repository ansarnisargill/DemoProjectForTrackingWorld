namespace DemoForTrackingWorld.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Vehicles",
                c => new
                    {
                        VehicleID = c.Int(nullable: false, identity: true),
                        RegNo = c.String(maxLength: 50),
                        Make = c.String(maxLength: 50),
                        Model = c.String(maxLength: 50),
                        Color = c.String(maxLength: 50),
                        EngineNo = c.String(maxLength: 50),
                        ChasisNo = c.String(maxLength: 50),
                        DateOfPurchase = c.DateTime(nullable: false),
                        Active = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.VehicleID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Vehicles");
        }
    }
}
