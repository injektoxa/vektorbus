namespace BlaBlaBusMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedFieldFriendlyName : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Buses", "FriendlyName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Buses", "FriendlyName");
        }
    }
}
