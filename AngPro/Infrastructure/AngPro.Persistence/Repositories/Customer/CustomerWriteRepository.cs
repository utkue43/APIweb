﻿using AngPro.Application.Repositories;
using AngPro.Domain.Entities;
using AngPro.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngPro.Persistence.Repositories
{
    public class CustomerWriteRepository : WriteRepository<Customer>, ICustomerWriteRepository
    {
        public CustomerWriteRepository(AngProDbContext context) : base(context)
        {
        }
    }
}
