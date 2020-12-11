using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API.Models
{
    [Table("stations", Schema = "public")]
    public class Station : IEntity
    {

        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }
        
        [Required]
        public double Lat { get; set; }

        [Required]
        public double Lng { get; set; }
        
        public ICollection<Vehicle> Vehicles { get; set; }
    }
}