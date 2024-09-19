using AngPro.Application.Repositories;
using AngPro.Domain.Entities;
using AngPro.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngPro.Persistence.Repositories
{
    internal class ProductWriteRepository : WriteRepository<Product>, IProductWriteRepository
    {
        public ProductWriteRepository(AngProDbContext context) : base(context)
        {
        }
    }
}
