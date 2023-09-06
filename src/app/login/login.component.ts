import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service.service';
import { JwtClientService } from '../jwt-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./dd.css']
})
export class LoginComponent implements OnInit {
  spinnerName='sp5';
  spinnerType='square-jelly-box';
  pages: any =[];
  constructor(private jwtClientService:JwtClientService,private service:ServiceService,private spinner: NgxSpinnerService,private http: HttpClient,private _router: Router) { }

  ngOnInit(): void {
  }


  onSubmit(form:NgForm){
    this.spinner.show();
    console.log(form.value)
    let body = new URLSearchParams();
    body.set('username', form.value.username);
    body.set('password', form.value.password);

    this.jwtClientService.authenticate(body).subscribe(response=>{

       localStorage.setItem('refresh_token',response.refresh_token);
       localStorage.setItem('access_token',response.access_token);
       this.service.setAccesToken(response.access_token) 
   


       let options2 = {
        headers: new HttpHeaders().set('Authorization', "Bearer " + response.access_token)
    };

       this.http.post('https://178.170.116.28/zoneVertsApi/getUser',body.toString(), options2 ).subscribe(response => 
      //  {
      //  this.http.post('http://localhost:8014/getUser',body.toString(), options2 ).subscribe(response => 
       {
        localStorage.setItem('user',JSON.stringify(response));

        for(let ele of JSON.parse(<string>localStorage.getItem('user')).profil.habilitations){
          this.pages.push(ele.name)
         
        }
        


        setTimeout(()=>{
          this.spinner.hide();
          this._router.navigate(['dashboard'])
          this._router.navigate(['dashboard'])
        },500)
       
          
        
        
      },err=>{    
        this.spinner.hide();
    
    
        if(err.error.error.includes('The Token has expired on')){
    
    
        this._router.navigateByUrl('/login'); 
      }})


    
  },err=>{
    this.spinner.hide();
  })
    
         

    }
    

}
