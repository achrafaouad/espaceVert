import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export class Task {
  id!: number;
  parentId!: number;
  title!: string;
  start!: Date;
  end!: Date;
  progress!: number;
}

export class Dependency {
  id!: number;
  predecessorId!: number;
  successorId!: number;
  type!: number;
}

export class Resource {
  id!: number;
  text!: string;
}

export class ResourceAssignment {
  id!: number;
  taskId!: number;
  resourceId!: number;
}



@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  private accesTocken = localStorage.getItem("access_token");
  // private  refresh_token= localStorage.getItem("refresh_token");
  private options2 = {
    headers: new HttpHeaders().set('Authorization', "Bearer " + this.accesTocken)
    };

    public users:any[] =[];
    public profiles:any[] =[];

    
    public setAccesToken(accn:string){
      this.accesTocken = accn;
      this.options2 = {
        headers: new HttpHeaders().set('Authorization', "Bearer " + this.accesTocken)
    };
  }

   //private apiUrl = 'http://localhost:80';

    // private apiUrl = 'http://localhost:8015';

    private apiUrl = 'https://178.170.116.28/zoneVertsApi';
    public imagePathBase = '/gestion_espace_vert';
    // public imagePathBase = '../..';


  constructor(private httpClient: HttpClient) {
  }

  public espacesVerts():Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/espacesVerts`)
  }
  public getspace(espaceID:any):Observable<any>{
    const url = `${this.apiUrl}/getspace/${espaceID}`;

    return this.httpClient.get<any>(url)
  }
  
  public updateUser(data:any):Observable<Object>{
 
    return this.httpClient.post<Object>(`${this.apiUrl}/updateUser`,data,this.options2);
  }

  public addEspaceVert(data:any):Observable<Object>{
 
    return this.httpClient.post<Object>(`${this.apiUrl}/addEspaceVert`,data,this.options2);
  }


  public getprofiles():Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/getprofiles`,this.options2);
  }
  
  public deleteEspaceVert(data):Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/deleteEspaceVert/${data}`,this.options2);
  }
  
  public getAllSpaces():Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/getAllSpaces`,this.options2);
  }

  public deleteSiteFromEspace(id,id_site):Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/deleteSite/${id}/${id_site}`,this.options2);
  }
  
  public saveUser(data:any):Observable<any>{
  
    return this.httpClient.post<any>(`${this.apiUrl}/user/save`,data,this.options2);
  }


  public addSiteToSpace(data:any,id:any):Observable<any>{
  
    return this.httpClient.post<any>(`${this.apiUrl}/addSiteToSpace/${id}`,data,this.options2);
  }



  public getprofilesbyID(data:any){
    for(let i = 0;i<this.profiles.length;i++){
      if(this.profiles[i].id_prof == data) {return this.profiles[i];}
    }
  }

  public getUserByid(data:any){
    for(let i = 0;i<this.users.length;i++){
      if(this.users[i].id == data) {return this.users[i];}
  
    }
  }

public getUsers():Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/users`,this.options2);
  }

  saveFuite(espaceVertId: number, fuite:any): Observable<any> {
    const url = `${this.apiUrl}/${espaceVertId}`;
    return this.httpClient.post<any>(url, fuite,this.options2);
  }

  getNotifications(userId: number): Observable<any> {
    const url = `${this.apiUrl}/getNotifications/${userId}`;
    return this.httpClient.get<any>(url,this.options2);
  }
  updateFuite(fuite:any): Observable<any> {
    const url = `${this.apiUrl}/updateFuite`;
    return this.httpClient.post<any>(url, fuite,this.options2);
  }


  public saveMarche(data:any):Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}/rest/saveMarche`,data,this.options2)
  }



 









}
