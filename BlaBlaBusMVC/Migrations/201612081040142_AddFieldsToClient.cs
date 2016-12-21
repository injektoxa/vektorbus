namespace BlaBlaBusMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddFieldsToClient : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Clients", "HasDisability", c => c.Boolean(nullable: false));
            AddColumn("dbo.Clients", "HasMinorChild", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Clients", "HasMinorChild");
            DropColumn("dbo.Clients", "HasDisability");
        }
    }
}
