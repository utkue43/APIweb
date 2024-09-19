using AngPro.Application.Repositories.ProductImageFile;
using AngPro.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngPro.Persistence.Repositories.ProductImageFile
{
    public class ProductImageFileReadRepository : ReadRepository<AngPro.Domain.Entities.ProductImageFile>, IProductImageFileReadRepository
    {
        public ProductImageFileReadRepository(AngProDbContext context) : base(context)
        {
        }
    }
}
