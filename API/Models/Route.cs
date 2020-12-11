using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("routes", Schema = "public")]
    public class Route : IEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Order Order { get; set; }
    }
}