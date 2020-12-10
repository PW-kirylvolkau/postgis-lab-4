using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("orders", Schema = "public")]
    public class Order : IEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string PickupAddress { get; set; }
        
        [Required, Range(-90, 90)]
        public double PickupLat { get; set; }

        [Required, Range(-180, 180)]
        public double PickupLng { get; set; }

        [Required]
        public string DeliveryAddress { get; set; }
        
        [Required, Range(-90, 90)]
        public double DeliveryLat { get; set; }

        [Required, Range(-180, 180)]
        public double DeliveryLng { get; set; }
        
        [Required]
        public string Sender { get; set; }

        [Required]
        public string  Recipient { get; set; }
        
        [Required, Range(0.0001 , 1000)]
        public double PackageWeight { get; set; }
    }
}