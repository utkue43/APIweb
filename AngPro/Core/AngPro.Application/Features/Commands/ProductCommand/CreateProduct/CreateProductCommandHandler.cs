using AngPro.Application.Repositories;
using AngPro.Application.ViewModels.Products;
using AngPro.Domain.Entities;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngPro.Application.Features.Commands.ProductCommand.CreateProduct
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommandRequest, CreateProductCommandResponse>
    {
        readonly IProductWriteRepository _productWriteRepository;
        readonly IValidator<VM_Create_Product> _validator;

        public CreateProductCommandHandler(IProductWriteRepository productWriteRepository, IValidator<VM_Create_Product> validator)
        {
            _productWriteRepository = productWriteRepository;
            _validator = validator;
        }

        public async Task<CreateProductCommandResponse> Handle(CreateProductCommandRequest request, CancellationToken cancellationToken)
        {
            var vmCreateProduct = new VM_Create_Product
            {
                Name = request.Name,
                Price = request.Price,
                Stock = request.Stock
            };

            var validationResult = _validator.Validate(vmCreateProduct);
            if (!validationResult.IsValid)
            {
                return new();
            }

            var newProduct = new Product
            {
                Name = request.Name,
                Price = request.Price,
                Stock = request.Stock
            };

            await _productWriteRepository.AddAsync(newProduct);
            await _productWriteRepository.SaveAsync();

            return new();
        }
    }

}
