namespace manageSchedules.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Employee",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LastName = c.String(),
                        FirstName = c.String(),
                        Type = c.Int(nullable: false),
                        Email = c.String(),
                        HireDate = c.DateTime(),
                        TotalShiftCount = c.Int(nullable: false),
                        TotalHoursCount = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Schedule",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        EmployeeId = c.Int(nullable: false),
                        ShiftId = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Shift",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        DayOfWeek = c.Int(nullable: false),
                        Details = c.String(),
                        Segment = c.Int(nullable: false),
                        Hours = c.Int(nullable: false),
                        StaffingRequirements = c.Int(nullable: false),
                        PriorityOrder = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Shift");
            DropTable("dbo.Schedule");
            DropTable("dbo.Employee");
        }
    }
}
