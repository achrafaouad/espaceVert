import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MohammedService {

  constructor(private httpClientModule:HttpClient) { }

  public  name:string = 'achraf'

   public urlApi = "http://localhost:8011/"

  public getItems():Observable<any>{
    return this.httpClientModule.get<any>("https://jsonplaceholder.typicode.com/posts")
  }

  public getProvinecs():Observable<any>{
    return this.httpClientModule.get<any>(this.urlApi +"getProvinecs")
  }

  public getFonciers():Observable<any>{
    return this.httpClientModule.get<any>(this.urlApi +"getFonciers")
  }

  public getNiveau():Observable<any>{
    return this.httpClientModule.get<any>(this.urlApi +"getNiveau")
  }




}
