namespace BlaBlaBusMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddPhotoToDriver : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Drivers", "Photo", c => c.Binary());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Drivers", "Photo");
        }
    }
}
