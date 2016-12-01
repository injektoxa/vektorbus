namespace BlaBlaBusMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddFieldToClientTrip : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ClientTrips", "AdditionalExpenses", c => c.Double());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ClientTrips", "AdditionalExpenses");
        }
    }
}
