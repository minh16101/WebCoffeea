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
    public class CategoryController : ApiController
    {
        // GET: api/Category
        public IEnumerable<Product> Get()
        {
            List<Product> products = new List<Product>();
            //Khoi tao doi tuong
            string connectString = "Server=LAPTOP-F6J06I0S\\SQLEXPRESS;Database=CoffeeHouseDB;Trusted_Connection=True"; //search string connection de tim cac string
            SqlConnection sqlCon = new SqlConnection(connectString);
            //Tuong tac voi database
            SqlCommand sqlCommand = sqlCon.CreateCommand();
            //Chuoi truy van
            sqlCommand.CommandText = "SELECT * FROM product.productions";
            //Mo ket noi voi database
            sqlCon.Open();
            //Thuc thi con viec voi database, sqlDR se nhan cong viec doc tung dong
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            //Xu ly du lieu tra ve
            while (sqlDataReader.Read())
            {
                Product product = new Product();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var colName = sqlDataReader.GetName(i);
                    var colValue = sqlDataReader.GetValue(i);
                    var property = product.GetType().GetProperty(colName);
                    if (property != null && colValue != DBNull.Value)
                    {
                        property.SetValue(product, colValue);
                    }
                }
                products.Add(product);
            }
            //Dong ket noi
            sqlCon.Close();
            return products;
        }

        // GET: api/Category/5
        public IEnumerable<Product> Get(int id)
        {
            List<Product> products = new List<Product>();
            //Khoi tao doi tuong
            string connectString = "Server=LAPTOP-F6J06I0S\\SQLEXPRESS;Database=CoffeeHouseDB;Trusted_Connection=True"; //search string connection de tim cac string
            SqlConnection sqlCon = new SqlConnection(connectString);
            //Tuong tac voi database
            SqlCommand sqlCommand = sqlCon.CreateCommand();
            //Chuoi truy van
            sqlCommand.Parameters.AddWithValue("@id", id);
            sqlCommand.CommandText = "SELECT * FROM product.productions WHERE category_id=@id";
            //Mo ket noi voi database
            sqlCon.Open();
            //Thuc thi con viec voi database, sqlDR se nhan cong viec doc tung dong
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            //Xu ly du lieu tra ve
            while (sqlDataReader.Read())
            {
                Product product = new Product();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var colName = sqlDataReader.GetName(i);
                    var colValue = sqlDataReader.GetValue(i);
                    var property = product.GetType().GetProperty(colName);
                    if (property != null && colValue != DBNull.Value)
                    {
                        property.SetValue(product, colValue);
                    }
                }
                products.Add(product);

            }
            //Dong ket noi
            sqlCon.Close();
            return products;
        }

        // POST: api/Category
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Category/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Category/5
        public void Delete(int id)
        {
        }
    }
}
