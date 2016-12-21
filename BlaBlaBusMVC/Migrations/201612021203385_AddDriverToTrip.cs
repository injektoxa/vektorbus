namespace BlaBlaBusMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddDriverToTrip : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Trips", "Driver_Id", c => c.Int());
            CreateIndex("dbo.Trips", "Driver_Id");
            AddForeignKey("dbo.Trips", "Driver_Id", "dbo.Drivers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Trips", "Driver_Id", "dbo.Drivers");
            DropIndex("dbo.Trips", new[] { "Driver_Id" });
            DropColumn("dbo.Trips", "Driver_Id");
        }
    }
}
