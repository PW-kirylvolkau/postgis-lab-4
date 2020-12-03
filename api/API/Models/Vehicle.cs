using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("vehicles", Schema = "public")]
    public class Vehicle
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int Name { get; set; }
    
        [Required]
        public int StationId { get; set; }
        
        [Required, Range(0, 1000)]
        public double Capacity { get; set; }
        
        public Station Station { get; set; }

        public ICollection<Route> Routes { get; set; }
    }
}