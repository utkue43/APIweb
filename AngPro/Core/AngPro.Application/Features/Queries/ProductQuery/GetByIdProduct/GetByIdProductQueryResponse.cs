using AngPro.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngPro.Application.Features.Queries.ProductQuery.GetByIdProduct
{
    public class GetByIdProductQueryResponse
    {
        public String Name { get; set; }
        public int Stock { get; set; }
        public float Price { get; set; }
        
    }
}
