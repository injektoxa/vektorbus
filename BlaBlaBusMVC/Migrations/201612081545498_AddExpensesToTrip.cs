namespace BlaBlaBusMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddExpensesToTrip : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Trips", "CompulsoryExpenses", c => c.Double(nullable: false));
            AddColumn("dbo.Trips", "UnexpectedExpenses", c => c.Double());
            AddColumn("dbo.Trips", "UnexpectedExpensesComments", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Trips", "UnexpectedExpensesComments");
            DropColumn("dbo.Trips", "UnexpectedExpenses");
            DropColumn("dbo.Trips", "CompulsoryExpenses");
        }
    }
}
