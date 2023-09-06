import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { compareAsc, format } from 'date-fns'
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users:any[] = [];
  province: any;
  provinces: string[] = [];
  provinceTosave: any;
  role: any;
  object: any;
  profiles:any =[];
  selectedProfil:any
  constructor(private lrsServiceService:ServiceService,private _router:Router,private router: Router,private route: ActivatedRoute) { 
    // this.getProvinces();
    this.getProfiles();
  }

  ngOnInit() {
    // this.users = this.lrsServiceService.getAllUsers();
    this.getusers();
  }

  getusers(){
    this.lrsServiceService.getUsers().subscribe(res=>{

      console.log(res)
      for(let i = 0;i<res.length;i++){
        res[i]['lastConnect'] = format(new Date(res[i]['lastConnect']), 'yyyy-MM-dd');
        res[i]['birthday'] = format(new Date(res[i]['birthday']), 'yyyy-MM-dd');
      }
      this.users = res;
      this.lrsServiceService.users = res;

       console.log(res)
      //  this.lrsServiceService.toastMessage("info","récupirations des utilisateurs")
    },err=> 
    { 
      // this.lrsServiceService.toastMessage("error","verifier votre connection")

      if(err.error.error.includes('The Token has expired on')){
        // this.lrsServiceService.toastMessage("info","votre session a été expiré")

      this._router.navigateByUrl('/login'); 
    }})
  }


  navigateToAccount(val:any){ 
    console.log(val)
    this.router.navigate([val], {relativeTo:this.route});
  }

  onSubmitEdit(ff:NgForm){
    console.log(ff.value);
    this.object = ff.value;
    this.object['id'] = null;
    this.object['image'] = null
    this.object['lastConnect'] = null
    if(this.role == 'simple_user') 
    this.object['roles'] = [{id: 24, name: 'simple_user'}]
    else this.object['roles'] = [{id: 21, name: 'Role_Admin'}]
    this.object['profil'] = this.selectedProfil

this.lrsServiceService.saveUser(this.object).subscribe(res=>{
  this.getusers();
  // this.lrsServiceService.toastMessage("success","L'utilisateur a été bien ajouté")

  document.getElementById('cllose')?.click()
},err=>
    {       
      // this.lrsServiceService.toastMessage("error","verifier votre connection")

       if(err.error.error.includes('The Token has expired on')){
        // this.lrsServiceService.toastMessage("info","votre session a été expiré")

      this._router.navigateByUrl('/login'); 
    }})
  }

  onchangeR(value:any){
    this.role = value;
    
  }
  onchangeP(value:any){
    // console.log(value)
    
    for(let i =0;i<this.profiles.length;i++){
      if(this.profiles[i].id_prof == value){
        this.selectedProfil  = this.profiles[i]
      }
    }
    

    console.log(this.selectedProfil);
  
  }


  

  getProfiles(){
    this.lrsServiceService.getprofiles().subscribe(res=>{
      this.profiles = res;
      console.error(this.profiles)
    },(err:HttpErrorResponse)=>{ 
      if(err.error.error.includes('The Token has expired on')){
      this.router.navigateByUrl('/login'); 
    }})
  }

}