using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using manageSchedules.Data.ManageSchedules;
using manageSchedules.Data.ManageSchedules.Entities;

namespace manageSchedules.Data.Employees
{
    public class ManageSchedulesContext : DbContext
    {
        public ManageSchedulesContext() : base("ManageSchedules")
        {
            Database.SetInitializer(new ManageSchedulesDBInitializer());
        }

        public DbSet<Employee.Entities.Employee> Employees { get; set; }
        public DbSet<Shift> Shifts { get; set; }
        public DbSet<Schedule> Schedules { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
