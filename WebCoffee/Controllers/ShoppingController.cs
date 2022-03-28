using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebCoffee.Controllers
{
    public class ShoppingController : ApiController
    {
        // GET: api/Shopping
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Shopping/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Shopping
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Shopping/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Shopping/5
        public void Delete(int id)
        {
        }
    }
}
