import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from '../../../contracts/list_product';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: any, errorCallBack?: any){

    this.httpClientService.post({
     fullEndPoint :"https://localhost:7178/post"
   },product)
   .subscribe(result =>{
     successCallBack(); 
     
    
   }, (errorResponse: HttpErrorResponse) =>
   { 
     
     const _error: Array<{ key: string, value: Array<string>}> = errorResponse.error;
     console.log(_error);
     
     let message =""
     _error.forEach((v: any, index) => {
       // v.value.forEach((_v, _index) =>{
         message += `${v.errorMessage}\n`;
       // });
     });
     errorCallBack(message);
   });
}
 
 async read(page: number = 0, size: number = 5, successCallBack, errorCallBack): Promise<{totalCount: number; products: List_Product[]}>{

  const myPromise: Promise<{totalCount: number; products: List_Product[]}> = lastValueFrom(this.httpClientService.get<{totalCount: number; products: List_Product[]}>({
    fullEndPoint :"https://localhost:7178/getAll",
    queryString : `page=${page}&size=${size}`
  }));

        myPromise.then(d => successCallBack())
        .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))
        return await myPromise;
    }

    async delete(id:string){
      const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
        fullEndPoint:'https://localhost:7178/delete/' + id
      }, id); 
      await firstValueFrom(deleteObservable);

    }

  

}

