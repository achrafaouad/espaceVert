import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-espace',
  templateUrl: './new-espace.component.html',
  styleUrls: ['./new-espace.component.scss']
})
export class NewEspaceComponent {
 espaces: any=[];
 searchText:string ='';
  image: string;


 constructor(private service:ServiceService,private router:Router){
  this.service.getAllSpaces().subscribe(res=>{this.espaces = res;console.log(res)},err=>{ if(err.error.error.includes('The Token has expired on')){
    // this.service.toastMessage("info","votre session a été expiré")
  this.router.navigateByUrl('/login'); 
}})
  this.image = this.service.imagePathBase;
 }



 navigateToTarget(object:any) {
  const dataToPass = object;
  this.router.navigate(['/info'], { queryParams: dataToPass });
}


}
