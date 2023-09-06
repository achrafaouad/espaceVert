import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { arbres, arbustes, gazon, palmiers } from '../dashboard/Helper';

@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.scss']
})
export class EditerComponent {
  image: string;
  site: any;
  dataReceived: any;

  arbresList:any[]=arbres;
  palmiersList:any[]=palmiers;
  arbustesList:any[]=arbustes;
  gazonList:any[]=gazon;

  objArbre ={
    intitule:"",
    qtt:0
  }
  objGazon={
    intitule:"",
    surface:0
  }
  objArbustes={
    intitule:"",
    surface:0
  }
  objPalmiers={
    intitule:"",
    qtt:0
  }
  constructor(private route: ActivatedRoute,private service:ServiceService,private router:Router){
    this.image = this.service.imagePathBase;
    

  }
  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      // Retrieve the data passed from the source component
      console.log(params)
      this.dataReceived = params;

      this.service.getspace(this.dataReceived.id).subscribe(res=>{

        this.site = res;
       
        console.log(res)
      },err=>{

      })
    });}
  

  onSubmit(espacevertForm: NgForm) {
    console.log(this.site)
  
this.service.addEspaceVert(this.site).subscribe(res=>{
  console.log(res)
  this.router.navigate(['/newEspace']); // Replace 'your-route' with the actual route path
},err=>{
console.log(err)
})

}




addToArbre() {
  // Check if an object with the same intitule already exists in the list
  const existingObject = this.site.arbres.find(item => item.intitule === this.objArbre.intitule);

  if (!existingObject) {
    // If no object with the same intitule exists, add the new object to the list
    this.site.arbres.push({...this.objArbre});
  } else {
    // If an object with the same intitule exists, handle the duplicate case here (e.g., show an error message or update the existing object)
    // For example, you can update the existing object's properties if needed:
    // existingObject.property = newValue;
  }
}


deleteArbre(n){
  console.log(n);
  this.site.arbres.splice(n, 1);
}

addToGazon() {
  // Check if an object with the same intitule already exists in the list
  const existingObject = this.site.gazon.find(item => item.intitule === this.objGazon.intitule);

  if (!existingObject) {
    // If no object with the same intitule exists, add the new object to the list
    this.site.gazon.push({...this.objGazon});
  } else {
    // If an object with the same intitule exists, handle the duplicate case here (e.g., show an error message or update the existing object)
    // For example, you can update the existing object's properties if needed:
    // existingObject.property = newValue;
  }
}


deleteGazon(n){
  console.log(n);
  this.site.gazon.splice(n, 1);
}

addToArbustes() {
  // Check if an object with the same intitule already exists in the list
  const existingObject = this.site.arbustes.find(item => item.intitule === this.objArbustes.intitule);

  if (!existingObject) {
    // If no object with the same intitule exists, add the new object to the list
    this.site.arbustes.push({...this.objArbustes});
  } else {
    // If an object with the same intitule exists, handle the duplicate case here (e.g., show an error message or update the existing object)
    // For example, you can update the existing object's properties if needed:
    // existingObject.property = newValue;
  }
}

deleteArbustes(n){
  console.log(n);
  this.site.arbustes.splice(n, 1);
}

addToPalmiers() {
  // Check if an object with the same intitule already exists in the list
  const existingObject = this.site.palmiers.find(item => item.intitule === this.objPalmiers.intitule);

  if (!existingObject) {
    // If no object with the same intitule exists, add the new object to the list
    this.site.palmiers.push({...this.objPalmiers});
  } else {
    // If an object with the same intitule exists, handle the duplicate case here (e.g., show an error message or update the existing object)
    // For example, you can update the existing object's properties if needed:
    // existingObject.property = newValue;
 
  }}  

deletePalmiers(n){
  console.log(n);
  this.site.palmiers.splice(n, 1);
}





}
