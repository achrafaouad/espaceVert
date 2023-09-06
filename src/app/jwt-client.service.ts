import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from './models/Token'

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  
  private apiUrl = 'https://178.170.116.28/zoneVertsApi';
  // private apiUrl = 'http://localhost:8014';
  //  private apiUrl = 'https://interconnexion-bg-smba.ma/dashborad_pipe2';
 csvRecords: any;
 constructor(private httpClient: HttpClient) { }

 public authenticate(request:any):Observable<Token>{
   let options = {
     headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
     .set('Connection', 'keep-alive').set('Accept','*/*')
     .set("Accept-Encoding","gzip, deflate, br").set("Host","<calculated when request is sent>")
     .set("Content-Length","<calculated when request is sent>")
       };
   return this.httpClient.post<Token>(`${this.apiUrl}/login`,request,options);
  }

  public welcome(token:any){
 let tokenStr = "Bearer " + token;
 const headers = new HttpHeaders().set("Authorization",tokenStr);
   return this.httpClient.get(`${this.apiUrl}/`,{headers,responseType:'text' as 'json'});
  }


  public signIn(token:any){
   return this.httpClient.post(`${this.apiUrl}/login`,token);
 }
 
}
