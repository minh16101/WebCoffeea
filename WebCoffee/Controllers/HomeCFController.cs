using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using WebCoffee.Models;

namespace WebCoffee.Controllers
{
    public class HomeCFController : ApiController
    {
        // GET: api/HomeCF
        public IEnumerable<Category> Get()
        {
            List<Category> categories = new List<Category>();
            //Khoi tao ket noi
            string connectString = "Server=LAPTOP-F6J06I0S\\SQLEXPRESS;Database=CoffeeHouseDB;Trusted_Connection=True";
            SqlConnection sqlConnection = new SqlConnection(connectString);
            //yeu cau duoc ket noi
            SqlCommand sqlCommand = sqlConnection.CreateCommand();
            //giao nhiem vu
            sqlCommand.CommandText = "SELECT * FROM product.categories";
            //sau khi giao nhiem vu xong thi oke mo cong ket noi cho ket noi
            sqlConnection.Open();
            //bat dau doc trong bang du lieu
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while(sqlDataReader.Read())
            {
                Category category = new Category();
                for(int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var colName = sqlDataReader.GetName(i);
                    var colValue = sqlDataReader.GetValue(i);
                    var property = category.GetType().GetProperty(colName);
                    if(property != null && colValue != DBNull.Value)
                    {
                        property.SetValue(category, colValue);
                    }
                }
                categories.Add(category);
            }
            sqlConnection.Close();
            return categories;
        }

        // GET: api/HomeCF/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/HomeCF
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/HomeCF/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/HomeCF/5
        public void Delete(int id)
        {
        }
    }
}
