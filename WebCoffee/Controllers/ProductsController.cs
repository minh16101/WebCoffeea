using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebCoffee.Models;
using System.Data.SqlClient;

namespace WebCoffee.Controllers
{
    public class ProductsController : ApiController
    {
        // GET: api/Products
        [Route("getallvalue/{category_id}")]
        public IEnumerable<Product> GetAllItem(int category_id)
        {
            List<Product> products = new List<Product>();
            //Khoi tao ket noi
            string connectString = "Server=LAPTOP-F6J06I0S\\SQLEXPRESS;Database=CoffeeHouseDB;Trusted_Connection=True";
            SqlConnection sqlConnection = new SqlConnection(connectString);
            //Dang ky ket noi
            SqlCommand sqlCommand = sqlConnection.CreateCommand();
            sqlCommand.Parameters.AddWithValue("@category_id", category_id);
            sqlCommand.CommandText = "SELECT * FROM product.productions WHERE category_id=@category_id";
            //Cho phep ket noi
            sqlConnection.Open();
            //Bat dau duyet du lieu
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                Product product = new Product();
                for(int i=0; i < sqlDataReader.FieldCount; i++)
                {
                    var colName = sqlDataReader.GetName(i);
                    var colValue = sqlDataReader.GetValue(i);
                    var property = product.GetType().GetProperty(colName);
                    if(property != null && colValue != DBNull.Value)
                    {
                        property.SetValue(product, colValue);
                    }
                }
                products.Add(product);
            }
            sqlConnection.Close();
            return products;
        }

        // GET: api/Products/5
        public Product Get(int id)
        {
            Product product = new Product();
            //Khoi tao ket noi
            string connectString = "Server=LAPTOP-F6J06I0S\\SQLEXPRESS;Database=CoffeeHouseDB;Trusted_Connection=True";
            SqlConnection sqlConnection = new SqlConnection(connectString);
            //Mo tuong tac voi co so du lieu
            SqlCommand sqlCommand = sqlConnection.CreateCommand();
            //Chuoi truy van
            sqlCommand.Parameters.AddWithValue("@id", id);
            sqlCommand.CommandText = "SELECT * FROM product.productions WHERE product_id=@id";
            //Mo ket noi voi DB
            sqlConnection.Open();
            //Thuc thi
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            if (sqlDataReader.Read())
            {
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var colName = sqlDataReader.GetName(i);
                    var colValue = sqlDataReader.GetValue(i);
                    var property = product.GetType().GetProperty(colName);
                    if(property != null && colValue != DBNull.Value)
                    {
                        property.SetValue(product, colValue);
                    }
                }
            }
            return product;
        }

        // POST: api/Products
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Products/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Products/5
        public void Delete(int id)
        {
        }
    }
}
