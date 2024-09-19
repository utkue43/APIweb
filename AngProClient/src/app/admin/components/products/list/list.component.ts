import {Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from '../../../../contracts/list_product';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit{

  constructor(spinner: NgxSpinnerService,private productService:ProductService, private alertifyService:AlertifyService){
    super(spinner)
  }
 
    
  

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate', 'photo', 'edit',  'delete'];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
    async getProducts(){
      this.showSpinner(SpinnerType.BallAtom)
      const allProducts: {totalCount: number; products: List_Product[]} = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage=>
      this.alertifyService.message(errorMessage,{
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.BottomLeft
      
      }))
        this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
        this.paginator.length = allProducts.totalCount;
      
    }

    addProductImage(id:string){

    }

    async pageChanged(){
      await this.getProducts();
    }

  async ngOnInit(){
    this.getProducts();
  }

  

}
