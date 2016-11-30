namespace BlaBlaBusMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AgentAddedToClientTrip : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ClientTrips", "AgentPrice", c => c.Double());
            AddColumn("dbo.ClientTrips", "Agent_Id", c => c.Int());
            CreateIndex("dbo.ClientTrips", "Agent_Id");
            AddForeignKey("dbo.ClientTrips", "Agent_Id", "dbo.Agents", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ClientTrips", "Agent_Id", "dbo.Agents");
            DropIndex("dbo.ClientTrips", new[] { "Agent_Id" });
            DropColumn("dbo.ClientTrips", "Agent_Id");
            DropColumn("dbo.ClientTrips", "AgentPrice");
        }
    }
}
