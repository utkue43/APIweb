import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { Create_Product } from '../../../../contracts/create_product';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { NgxFileDropModule} from 'ngx-file-drop'
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})



export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spiner : NgxSpinnerService ,private productService: ProductService, private alertify: AlertifyService){
    super(spiner) 
  }

  ngOnInit(): void {
    
  }

  @Output() createdProduct : EventEmitter<Create_Product> = new EventEmitter(); 
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    fullEndPoint : "https://localhost:7178/post/file",
    explantion: "Resimleri sürükleyin veya seçin",
    isAdminPage: true,
    accept: ".png, .jpg, .jpeg"
  }

  create(name:HTMLInputElement, stock:HTMLInputElement, price:HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.price = parseInt(price.value);
    create_product.stock = parseFloat(stock.value);
    this.productService.create(create_product, () => {
      
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("ürün başarıyla eklenmiştir", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdProduct.emit(create_product);
      
      

    }, errorMessage => {
      this.alertify.message(errorMessage,{
        dismissOthers: true,
        messageType:MessageType.Error,
        position: Position.TopRight

      })
    });
    }

   
}
