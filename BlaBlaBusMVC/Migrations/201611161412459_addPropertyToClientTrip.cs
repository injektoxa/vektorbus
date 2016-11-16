namespace BlaBlaBusMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addPropertyToClientTrip : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ClientTrips", "IsComeOutOnBorder", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ClientTrips", "IsComeOutOnBorder");
        }
    }
}
