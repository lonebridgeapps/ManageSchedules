using System.ComponentModel.DataAnnotations;

namespace manageSchedules.Data.ManageSchedules.Entities
{
    public class Shift
    {
        public Shift()
        {
        }

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int DayOfWeek { get; set; }
        public string Details { get; set; }
        public int Segment { get; set; }
        public int Hours { get; set; }
        public int StaffingRequirements { get; set; }
        public int PriorityOrder { get; set; }
    }
}
