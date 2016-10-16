namespace BlaBlaBusMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedFieldsToTrip : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Trips", "Comments", c => c.String());
            AddColumn("dbo.Trips", "CityFrom_Id", c => c.Int());
            AddColumn("dbo.Trips", "CityTo_Id", c => c.Int());
            CreateIndex("dbo.Trips", "CityFrom_Id");
            CreateIndex("dbo.Trips", "CityTo_Id");
            AddForeignKey("dbo.Trips", "CityFrom_Id", "dbo.Cities", "Id");
            AddForeignKey("dbo.Trips", "CityTo_Id", "dbo.Cities", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Trips", "CityTo_Id", "dbo.Cities");
            DropForeignKey("dbo.Trips", "CityFrom_Id", "dbo.Cities");
            DropIndex("dbo.Trips", new[] { "CityTo_Id" });
            DropIndex("dbo.Trips", new[] { "CityFrom_Id" });
            DropColumn("dbo.Trips", "CityTo_Id");
            DropColumn("dbo.Trips", "CityFrom_Id");
            DropColumn("dbo.Trips", "Comments");
        }
    }
}
