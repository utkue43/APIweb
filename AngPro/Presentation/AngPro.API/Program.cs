
using AngPro.Application;
using AngPro.Application.Abstractions.Storage;
using AngPro.Application.Repositories;
using AngPro.Application.Repositories.ProductImageFile;
using AngPro.Application.RequestParameters;
using AngPro.Application.Validators.Products;
using AngPro.Application.ViewModels.Products;
using AngPro.Domain.Entities;
using AngPro.Infrastructure;
using AngPro.Infrastructure.Services;
using AngPro.Infrastructure.Services.Storage.Local;
using AngPro.Persistence;
using AngPro.Persistence.Repositories.ProductImageFile;
using Azure.Core;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddPersistenceServices();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddInfrastructureService();
builder.Services.AddPersistenceServices();
builder.Services.AddApplicationServices();
builder.Services.AddStorage<LocalStorage>();
builder.Services.AddCors(options => options.AddDefaultPolicy(policy =>
    policy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod()
 ));
builder.Services.AddValidatorsFromAssemblyContaining<CreateProductValidator>();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors();



app.MapGet("/getAll", async ([AsParameters] Pagination pagination, IProductReadRepository productReadRepository) =>
{

    

    
    var totalCount = productReadRepository.GetAll(false).Count();
    var products = productReadRepository.GetAll(false).Skip(pagination.Page * pagination.Size).Take(pagination.Size).Select(p => new
    {
        p.Id,
        p.Name,
        p.Stock,
        p.Price,
        p.CreatedDate,
        p.UpdatedDate
    });
    return (new
    {
        totalCount,
        products
    });
});


app.MapGet("/getbyid/{id}", async (string id, IProductReadRepository productReadRepository) =>
{
    var product = await productReadRepository.GetByIdAsync(id, false);
    return product != null ? Results.Ok(product) : Results.NotFound();
});


app.MapPost("/post", async (IProductWriteRepository productWriteRepository, IValidator<VM_Create_Product> validator, VM_Create_Product model) =>
{
    
    var validationResult = validator.Validate(model);
    if (!validationResult.IsValid)
    {
        
        return Results.BadRequest(validationResult.Errors);
    }

    var newProduct = new Product
    {
        Name = model.Name,
        Price = model.Price,
        Stock = model.Stock
    };

    await productWriteRepository.AddAsync(newProduct);
    await productWriteRepository.SaveAsync();

    
    return Results.Created($"/getbyid/{newProduct.Id}", newProduct);
});



app.MapPut("/put", async (VM_Update_Product model, IProductReadRepository productReadRepository, IProductWriteRepository productWriteRepository) =>
{
    var product = await productReadRepository.GetByIdAsync(model.Id);
    if (product == null)
    {
        return Results.NotFound();
    }
    product.Stock = model.Stock;
    product.Name = model.Name;
    product.Price = model.Price;
    await productWriteRepository.SaveAsync();
    return Results.Ok(product);
});


app.MapDelete("/delete/{id}", async (string id, IProductWriteRepository productWriteRepository) =>
{
    var result = await productWriteRepository.RemoveAsync(id);
    if (result)
    {
        await productWriteRepository.SaveAsync();
        return Results.Ok();
    }
    return Results.NotFound();
});

app.MapPost("/post/file", async (HttpContext context, IWebHostEnvironment _webHostEnvironmnet, IStorage storage, IProductImageFileWriteRepository productImageFileWriteRepository, IStorageService storageService) =>
{
    var files = context.Request.Form.Files;

    var datas = await storage.UploadAsync("resource/files", files);

    await productImageFileWriteRepository.AddRangeAsync(datas.Select(d => new ProductImageFile()
    {
        FileName = d.fileName,
        Path = d.pathOrContainer,
        Storage = storageService.StorageName
    }).ToList());

    await productImageFileWriteRepository.SaveAsync();

    return Results.Ok();

    //var files = context.Request.Form.Files; 
    //var datas = await storage.UploadAsync("resource/product-images", files);

    //await productImageFileWriteRepository.AddRangeAsync(datas.Select(d => new ProductImageFile()
    //{
    //    FileName = d.fileName,
    //    Path = d.pathOrContainer,
    //}).ToList());

    //await productImageFileWriteRepository.SaveAsync();

    //return Results.Ok();
});







app.Run();