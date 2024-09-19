import { Inject, inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl : string ) {  }
  
  

  private url(requestParameters: Partial <RequestParameters>){

    return`${requestParameters ? requestParameters : this.baseUrl}`
  }

  
  get<T>(requestParameter: Partial<RequestParameters>, id?: string): Observable<T> {
    const queryString = requestParameter.queryString ? `?${requestParameter.queryString}` : "";
    let url: string = "";
    if (requestParameter.fullEndPoint) {
      // url = `${this.url(requestParameter)}${queryString}`
      url = requestParameter.fullEndPoint + `?${requestParameter.queryString}`
      console.log(requestParameter.queryString)
    } else {   
        url = `${this.url(requestParameter)}${queryString}`
        console.log(requestParameter.queryString)
    }
    return this.httpClient.get<T>(url, { headers: requestParameter.headers });
}



  post<T>(requestParameter: Partial<RequestParameters>, body : Partial <T>): Observable<T>{
    let url: string = "";
    if (requestParameter.fullEndPoint){
      url = requestParameter.fullEndPoint;
    } else {
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}`:""}`
    }

    return this.httpClient.post<T>(url, body, {headers: requestParameter.headers});

  }

  put<T>(requestParameter: Partial<RequestParameters>, body: Partial <T>): Observable<T>{
      let url: string = "";
      if (requestParameter.fullEndPoint){
        url = requestParameter.fullEndPoint;
      } else {
        url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}`:""}`
      }
      return this.httpClient.post<T>(url, body, {headers: requestParameter.headers});

  }

  delete<T>(requestParameter: Partial<RequestParameters>, id: string): Observable<T> {
    let url: string = "";
    
    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}`:""}`
    }
  
    return (this.httpClient.delete<T>(url, { headers: requestParameter.headers }))
    
  }
}




export class RequestParameters{
  queryString?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
  endpoint?: string;
}
