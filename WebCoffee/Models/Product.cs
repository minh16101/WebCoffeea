using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebCoffee.Models
{
    public class Product
    {
        public int product_id { get; set; }
        public string product_name { get; set; }
        public int product_price { get; set; }
        public int size_id { get; set; }
        public byte[] product_image { get; set; }
        public int brand_id { get; set; }
        public int category_id { get; set; }
    }
}