﻿using AngPro.Domain.Entities;
using AngPro.Domain.Entities.Common;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngPro.Persistence.Contexts
{
    public class AngProDbContext : DbContext
    {
        public AngProDbContext(DbContextOptions options) : base(options) 
        { 
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Domain.Entities.File> Files { get; set; }
        public DbSet<ProductImageFile> ProductImages { get; set; }
        public DbSet<InvoiceFile> InvoiceFiles { get; set; }

        

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var datas = ChangeTracker
                .Entries<BaseEntity>();

            foreach (var data in datas) {

                _ = data.State switch
                {
                    EntityState.Added => data.Entity.CreatedDate = DateTime.UtcNow,
                    EntityState.Modified => data.Entity.UpdatedDate = DateTime.UtcNow,
                    EntityState.Deleted => data.Entity.UpdatedDate
                };
            }
            return await base.SaveChangesAsync(cancellationToken);
        }

    }
}
