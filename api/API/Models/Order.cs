using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("orders", Schema = "public")]
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string PickupAddress { get; set; }

        [Required]
        public string DeliveryAddress { get; set; }
        
        [Required]
        public string Sender { get; set; }

        [Required]
        public string  Recipient { get; set; }
        
        [Required, Range(0.0001 , 1000)]
        public double PackageWeight { get; set; }
    }
}