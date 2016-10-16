namespace BlaBlaBusMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changed_structure_of_db : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.TripClients", "Trip_Id", "dbo.Trips");
            DropForeignKey("dbo.TripClients", "Client_Id", "dbo.Clients");
            DropForeignKey("dbo.Prices", "Client_Id", "dbo.Clients");
            DropForeignKey("dbo.Prices", "Trip_Id", "dbo.Trips");
            DropIndex("dbo.Prices", new[] { "Client_Id" });
            DropIndex("dbo.Prices", new[] { "Trip_Id" });
            DropIndex("dbo.TripClients", new[] { "Trip_Id" });
            DropIndex("dbo.TripClients", new[] { "Client_Id" });
            CreateTable(
                "dbo.ClientTrips",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Price = c.Double(nullable: false),
                        Client_Id = c.Int(),
                        From_Id = c.Int(),
                        To_Id = c.Int(),
                        Trip_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Clients", t => t.Client_Id)
                .ForeignKey("dbo.Cities", t => t.From_Id)
                .ForeignKey("dbo.Cities", t => t.To_Id)
                .ForeignKey("dbo.Trips", t => t.Trip_Id)
                .Index(t => t.Client_Id)
                .Index(t => t.From_Id)
                .Index(t => t.To_Id)
                .Index(t => t.Trip_Id);
            
            DropTable("dbo.Prices");
            DropTable("dbo.TripClients");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.TripClients",
                c => new
                    {
                        Trip_Id = c.Int(nullable: false),
                        Client_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Trip_Id, t.Client_Id });
            
            CreateTable(
                "dbo.Prices",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PriceForTrip = c.Double(nullable: false),
                        Client_Id = c.Int(),
                        Trip_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            DropForeignKey("dbo.ClientTrips", "Trip_Id", "dbo.Trips");
            DropForeignKey("dbo.ClientTrips", "To_Id", "dbo.Cities");
            DropForeignKey("dbo.ClientTrips", "From_Id", "dbo.Cities");
            DropForeignKey("dbo.ClientTrips", "Client_Id", "dbo.Clients");
            DropIndex("dbo.ClientTrips", new[] { "Trip_Id" });
            DropIndex("dbo.ClientTrips", new[] { "To_Id" });
            DropIndex("dbo.ClientTrips", new[] { "From_Id" });
            DropIndex("dbo.ClientTrips", new[] { "Client_Id" });
            DropTable("dbo.ClientTrips");
            CreateIndex("dbo.TripClients", "Client_Id");
            CreateIndex("dbo.TripClients", "Trip_Id");
            CreateIndex("dbo.Prices", "Trip_Id");
            CreateIndex("dbo.Prices", "Client_Id");
            AddForeignKey("dbo.Prices", "Trip_Id", "dbo.Trips", "Id");
            AddForeignKey("dbo.Prices", "Client_Id", "dbo.Clients", "Id");
            AddForeignKey("dbo.TripClients", "Client_Id", "dbo.Clients", "Id", cascadeDelete: true);
            AddForeignKey("dbo.TripClients", "Trip_Id", "dbo.Trips", "Id", cascadeDelete: true);
        }
    }
}
