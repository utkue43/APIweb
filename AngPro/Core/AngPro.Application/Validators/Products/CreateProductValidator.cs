using AngPro.Application.ViewModels.Products;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngPro.Application.Validators.Products
{
    public class CreateProductValidator : AbstractValidator<VM_Create_Product>
    {
        public CreateProductValidator() {
            RuleFor(p => p.Name)
                    .NotEmpty()
                    .NotNull()
                         .WithMessage("Ürün adı girin")
                    .MaximumLength(150)
                    .MinimumLength(3)
                         .WithMessage("Ürün adı 3-150 karakter arası olur");

            RuleFor(p => p.Stock)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Boş olamaz")
                .Must(s => s >= 0)
                    .WithMessage("Stok bilgisini düzgün girin");

            RuleFor(p => p.Price)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Boş olamaz")
                .Must(s => s >= 1)
                    .WithMessage("Fiyat bilgisini düzgün girin");

        }
    }
}
