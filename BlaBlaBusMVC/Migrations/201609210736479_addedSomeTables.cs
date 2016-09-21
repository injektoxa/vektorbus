namespace BlaBlaBusMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedSomeTables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Cities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.CityPrices",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Price = c.Double(nullable: false),
                        CityFrom_Id = c.Int(),
                        CityTo_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cities", t => t.CityFrom_Id)
                .ForeignKey("dbo.Cities", t => t.CityTo_Id)
                .Index(t => t.CityFrom_Id)
                .Index(t => t.CityTo_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CityPrices", "CityTo_Id", "dbo.Cities");
            DropForeignKey("dbo.CityPrices", "CityFrom_Id", "dbo.Cities");
            DropIndex("dbo.CityPrices", new[] { "CityTo_Id" });
            DropIndex("dbo.CityPrices", new[] { "CityFrom_Id" });
            DropTable("dbo.CityPrices");
            DropTable("dbo.Cities");
        }
    }
}
