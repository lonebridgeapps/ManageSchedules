using System.ComponentModel.DataAnnotations;
using manageScedules.Common.Enum;

namespace manageSchedules.Data.ManageSchedules.Entities
{ 
    public class Schedule
    {
        public Schedule()
        {
        }

        [Key]
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int ShiftId { get; set; }
        public Status Status { get; set; }
    }
}
