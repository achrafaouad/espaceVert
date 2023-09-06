import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-agent-profil-edit',
  templateUrl: './agent-profil-edit.component.html',
  styleUrls: ['./agent-profil-edit.component.scss']
})
export class AgentProfilEditComponent implements OnInit {

  id:any;
  mapPrevLine: any;
  user: any;
  provinces: string[] = [];
  isChecked = true;
  object: any;
  province:string = "";
  provincesSelect: any;
  provinceSelect: string = "";
  selectedProvince: any;
  selectedProfil: any;
  profil: any;
  proflies: any;
  profiled: any;
  constructor( private lrsServiceService :ServiceService,private spinner: NgxSpinnerService, private _router: Router,private route:ActivatedRoute) {
    this.getprofiles();
  }

  ngOnInit(): void {
      this.route.params.subscribe((params:Params)=>{  
      this.id= +params['id'];
      console.log(this.id);
      this.user = this.lrsServiceService.getUserByid(this.id);
      // this.agent = this.lrsServiceService.getuserById(this.id);
      // this.province = this.user.province.name;
      this.profiled = this.user.profil.id_prof
    }
    ) 

  }


  onSubmit(ff:NgForm){
    console.log(ff.value)
    this.spinner.show();

    this.object = ff.value;
    this.object['id'] = this.user.id
    this.object['image'] = this.user.image
    this.object['password'] = this.user.password
    this.object['lastConnect'] = this.user.lastConnect
    this.object['lastConnect'] = this.user.lastConnect
    this.object['roles'] = this.user.roles
    this.object['username'] = this.user.username
    this.object['profil'] = this.profil


    this.lrsServiceService.updateUser(this.object).subscribe((res:any)=>{
      this.user = res
      // this.lrsServiceService.toastMessage("success","les information sont bien changées")
      setTimeout(()=>{
        this.spinner.hide();
       
      },500)

      this._router.navigate(['typography'])
    },(err:HttpErrorResponse)=>{
      this.spinner.hide();
      if(err.error.error.includes('The Token has expired on')){
        // this.service.toastMessage("info","votre session a été expiré")
      this._router.navigateByUrl('/login'); 
    }
      // this.lrsServiceService.toastMessage("error","verifier votre connection")

    })
  }

  checkedOrNot(province:any){

    console.log(this.user.provinces.length)
      for( var j = 0; j < this.user.provinces.length; j++){
        if ( this.user.provinces[j].name === province) { 
          console.log("hello mother fucker ",true)
          return true
        }
      }
     
  return false;
  }


  onchange(val:any){
    console.log(val)
    for(let i = 0;i<this.proflies.length;i++){
      console.log(this.proflies[i].name) 
      console.log(this.proflies[i].id) 
      if(this.proflies[i].id_prof == val){
        this.profil = this.proflies[i];
        console.log(this.proflies[i].name) 
        console.log("-----------------------")
        console.log(val);
        break;
      }
    }

  }

  getprofiles(){
    this.spinner.show();

    this.lrsServiceService.getprofiles().subscribe(res=>{
      this.proflies = res;
      setTimeout(()=>{
        this.spinner.hide();
       
      },500)
    },(err:HttpErrorResponse)=>{ if(err.error.error.includes('The Token has expired on')){
      // this.service.toastMessage("info","votre session a été expiré")
    this._router.navigateByUrl('/login'); 
  }       this.spinner.hide();
    })
  }

}
