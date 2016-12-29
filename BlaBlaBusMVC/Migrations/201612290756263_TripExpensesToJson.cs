namespace BlaBlaBusMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TripExpensesToJson : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Trips", "JsonUnexpectedExpenses", c => c.String());
            AddColumn("dbo.Trips", "JsonCompulsoryExpenses", c => c.String());
            DropColumn("dbo.Trips", "CompulsoryExpenses");
            DropColumn("dbo.Trips", "UnexpectedExpenses");
            DropColumn("dbo.Trips", "UnexpectedExpensesComments");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Trips", "UnexpectedExpensesComments", c => c.String());
            AddColumn("dbo.Trips", "UnexpectedExpenses", c => c.Double());
            AddColumn("dbo.Trips", "CompulsoryExpenses", c => c.Double(nullable: false));
            DropColumn("dbo.Trips", "JsonCompulsoryExpenses");
            DropColumn("dbo.Trips", "JsonUnexpectedExpenses");
        }
    }
}
