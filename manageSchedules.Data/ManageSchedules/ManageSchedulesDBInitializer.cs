using System;
using System.Collections.Generic;
using System.Data.Entity;
using manageScedules.Common.Enum;
using manageSchedules.Data.Employees;

namespace manageSchedules.Data.ManageSchedules
{
    public class ManageSchedulesDBInitializer : DropCreateDatabaseAlways<ManageSchedulesContext>
    {
        protected override void Seed(ManageSchedulesContext context)
        {
            #region Set Employee Table 

            IList<Employee.Entities.Employee> initEmployees = new List<Employee.Entities.Employee>();
            var hireDate = new DateTime(01/01/2010);

            initEmployees.Add(new Employee.Entities.Employee()
            {
                Id = 1,
                LastName = "J",
                FirstName = "Barb",
                Type = EmployeeType.Server,
                Email = "",
                HireDate = hireDate,
                TotalShiftCount = 0,
                TotalHoursCount = 0
            });

            initEmployees.Add(new Employee.Entities.Employee()
            {
                Id = 2,
                LastName = "G",
                FirstName = "Heather",
                Type = EmployeeType.Server,
                Email = "",
                HireDate = hireDate,
                TotalShiftCount = 0,
                TotalHoursCount = 0
            });

            initEmployees.Add(new Employee.Entities.Employee()
            {
                Id = 3,
                LastName = "H",
                FirstName = "Lisa",
                Type = EmployeeType.Server,
                Email = "",
                HireDate = hireDate,
                TotalShiftCount = 0,
                TotalHoursCount = 0
            });

            initEmployees.Add(new Employee.Entities.Employee()
            {
                Id = 4,
                LastName = "M",
                FirstName = "Robin",
                Type = EmployeeType.Server,
                Email = "",
                HireDate = hireDate,
                TotalShiftCount = 0,
                TotalHoursCount = 0
            });
            
            initEmployees.Add(new Employee.Entities.Employee()
            {
                Id = 5,
                LastName = "G",
                FirstName = "Tara",
                Type = EmployeeType.Server,
                Email = "",
                HireDate = hireDate,
                TotalShiftCount = 0,
                TotalHoursCount = 0
            });

            initEmployees.Add(new Employee.Entities.Employee()
            {
                Id = 6,
                LastName = "B",
                FirstName = "Jordan",
                Type = EmployeeType.Server,
                Email = "",
                HireDate = hireDate,
                TotalShiftCount = 0,
                TotalHoursCount = 0
            });

            initEmployees.Add(new Employee.Entities.Employee()
            {
                Id = 7,
                LastName = "M",
                FirstName = "Jamie",
                Type = EmployeeType.Server,
                Email = "",
                HireDate = hireDate,
                TotalShiftCount = 0,
                TotalHoursCount = 0
            });

            initEmployees.Add(new Employee.Entities.Employee()
            {
                Id = 8,
                LastName = "H",
                FirstName = "Beverly",
                Type = EmployeeType.Server,
                Email = "",
                HireDate = hireDate,
                TotalShiftCount = 0,
                TotalHoursCount = 0
            });
            
            initEmployees.Add(new Employee.Entities.Employee()
            {
                Id = 9,
                LastName = "D",
                FirstName = "Diana",
                Type = EmployeeType.Server,
                Email = "",
                HireDate = hireDate,
                TotalShiftCount = 0,
                TotalHoursCount = 0
            });

            initEmployees.Add(new Employee.Entities.Employee()
            {
                Id = 10,
                LastName = "P",
                FirstName = "Gabby",
                Type = EmployeeType.Server,
                Email = "",
                HireDate = hireDate,
                TotalShiftCount = 0,
                TotalHoursCount = 0
            });

            foreach (var emp in initEmployees)
                context.Employees.Add(emp);

            #endregion

            #region Set Schedule Table

            #endregion

            #region Set Shift Table

            #endregion

            base.Seed(context);
        }
    }
}
