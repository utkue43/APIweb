using AngPro.Application.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngPro.Application.InvoiceFile
{
    public interface IInvoiceFileReadRepository : IReadRepository<AngPro.Domain.Entities.InvoiceFile>
    {
    }
}
