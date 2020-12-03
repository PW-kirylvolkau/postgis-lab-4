using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("stations", Schema = "public")]
    public class Station
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }
        
        [Required, Range(-90, 90)]
        public double Lat { get; set; }

        [Required, Range(-180, 180)]
        public double Lng { get; set; }
        
        public ICollection<Vehicle> Vehicles { get; set; }
    }
}