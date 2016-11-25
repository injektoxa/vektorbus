namespace BlaBlaBusMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Triparrivaldate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Trips", "ArrivalDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Trips", "ArrivalDate");
        }
    }
}
