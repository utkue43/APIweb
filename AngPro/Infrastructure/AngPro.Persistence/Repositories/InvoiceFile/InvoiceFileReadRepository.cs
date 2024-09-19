using AngPro.Application.InvoiceFile;
using AngPro.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngPro.Persistence.Repositories.InvoiceFile
{
    public class InvoiceFileReadRepository : ReadRepository<AngPro.Domain.Entities.InvoiceFile>, IInvoiceFileReadRepository
    {
        public InvoiceFileReadRepository(AngProDbContext context) : base(context)
        {
        }
    }
}
