import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { arbres, arbustes, gazon, palmiers } from '../dashboard/Helper';

@Component({
  selector: 'app-add-espace',
  templateUrl: './add-espace.component.html',
  styleUrls: ['./add-espace.component.scss']
})
export class AddEspaceComponent {
  image: string;

  arbresList:any[]=arbres;
  palmiersList:any[]=palmiers;
  arbustesList:any[]=arbustes;
  gazonList:any[]=gazon;



  Mesgazon=[]
  Mespalmiers=[]
  Mesarbustes=[]
  Mesarbres=[]
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
  constructor(private service:ServiceService,private router: Router){
    this.image = this.service.imagePathBase;

  }


  addToArbre() {
    // Check if an object with the same intitule already exists in the list
    const existingObject = this.Mesarbres.find(item => item.intitule === this.objArbre.intitule);
  
    if (!existingObject) {
      // If no object with the same intitule exists, add the new object to the list
      this.Mesarbres.push({...this.objArbre});
    } else {
      // If an object with the same intitule exists, handle the duplicate case here (e.g., show an error message or update the existing object)
      // For example, you can update the existing object's properties if needed:
      // existingObject.property = newValue;
    }
  }
  

  deleteArbre(n){
    console.log(n);
    this.Mesarbres.splice(n, 1);
  }

  addToGazon() {
    // Check if an object with the same intitule already exists in the list
    const existingObject = this.Mesgazon.find(item => item.intitule === this.objGazon.intitule);
  
    if (!existingObject) {
      // If no object with the same intitule exists, add the new object to the list
      this.Mesgazon.push({...this.objGazon});
    } else {
      // If an object with the same intitule exists, handle the duplicate case here (e.g., show an error message or update the existing object)
      // For example, you can update the existing object's properties if needed:
      // existingObject.property = newValue;
    }
  }
  

  deleteGazon(n){
    console.log(n);
    this.Mesgazon.splice(n, 1);
  }

  addToArbustes() {
    // Check if an object with the same intitule already exists in the list
    const existingObject = this.Mesarbustes.find(item => item.intitule === this.objArbustes.intitule);
  
    if (!existingObject) {
      // If no object with the same intitule exists, add the new object to the list
      this.Mesarbustes.push({...this.objArbustes});
    } else {
      // If an object with the same intitule exists, handle the duplicate case here (e.g., show an error message or update the existing object)
      // For example, you can update the existing object's properties if needed:
      // existingObject.property = newValue;
    }
  }
  
  deleteArbustes(n){
    console.log(n);
    this.Mesarbustes.splice(n, 1);
  }

  addToPalmiers() {
    // Check if an object with the same intitule already exists in the list
    const existingObject = this.Mespalmiers.find(item => item.intitule === this.objPalmiers.intitule);
  
    if (!existingObject) {
      // If no object with the same intitule exists, add the new object to the list
      this.Mespalmiers.push({...this.objPalmiers});
    } else {
      // If an object with the same intitule exists, handle the duplicate case here (e.g., show an error message or update the existing object)
      // For example, you can update the existing object's properties if needed:
      // existingObject.property = newValue;
   
    }}  

  deletePalmiers(n){
    console.log(n);
    this.Mespalmiers.splice(n, 1);
  }

  onSubmit(espacevertForm: NgForm) {
    if (espacevertForm.valid) {
      const name = espacevertForm.value.name;
      const surface = espacevertForm.value.surface;
      
      // Now you can use 'name' and 'surface' as the form values
      console.log('Name:', name);
      console.log('Surface:', surface);
       
      this.service.addEspaceVert({
        fuite:false,
        designation:name,
        surface:surface,
        dateAmenagement:espacevertForm.value.dateAmenagement,
        entreprise:espacevertForm.value.entreprise,
        reseauArrosage:espacevertForm.value.reseauArrosage,
        gazon:this.Mesgazon,
        palmiers:this.Mespalmiers,
        arbres:this.Mesarbres,
        arbustes:this.Mesarbustes,
      }).subscribe(res=>{ 
        this.router.navigate(['/newEspace']); // Replace 'your-route' with the actual route path

      },err=>{ if(err.error.error.includes('The Token has expired on')){
        // this.service.toastMessage("info","votre session a été expiré")
      this.router.navigateByUrl('/login'); 
    }}
      )
    }
  


}




}
