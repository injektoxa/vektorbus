namespace BlaBlaBusMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class added_Comments_to_client : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Clients", "HasDiscount", c => c.Boolean(nullable: false));
            AddColumn("dbo.Clients", "Comments", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Clients", "Comments");
            DropColumn("dbo.Clients", "HasDiscount");
        }
    }
}
