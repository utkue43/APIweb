using AngPro.Application.Repositories;
using AngPro.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngPro.Persistence.Repositories.File
{
    public class FileReadRepository : ReadRepository<AngPro.Domain.Entities.File>, IFileReadRepository
    {
        public FileReadRepository(AngProDbContext context) : base(context)
        {
        }
    }
}
