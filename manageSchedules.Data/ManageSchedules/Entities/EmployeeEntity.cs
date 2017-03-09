using System;
using System.ComponentModel.DataAnnotations;
using manageScedules.Common.Enum;

namespace manageSchedules.Data.Employee.Entities
{
    public class Employee
    {
        public Employee()
        {
        }

        [Key]
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public EmployeeType Type { get; set; }
        public string Email { get; set; }
        public DateTime? HireDate { get; set; }
        public int TotalShiftCount { get; set; }
        public int TotalHoursCount { get; set; }
    }
}
