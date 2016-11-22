namespace BlaBlaBusMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddBaggageFieldToClientTrip : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ClientTrips", "HasBaggage", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ClientTrips", "HasBaggage");
        }
    }
}