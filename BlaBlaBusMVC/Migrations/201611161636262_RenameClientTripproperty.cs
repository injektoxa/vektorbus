namespace BlaBlaBusMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RenameClientTripProperty : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ClientTrips", "IsStayInBus", c => c.Boolean(nullable: false));
            DropColumn("dbo.ClientTrips", "IsComeOutOnBorder");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ClientTrips", "IsComeOutOnBorder", c => c.Boolean(nullable: false));
            DropColumn("dbo.ClientTrips", "IsStayInBus");
        }
    }
}
