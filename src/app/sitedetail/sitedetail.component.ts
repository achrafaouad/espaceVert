import { style } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import CircleStyle from 'ol/style/Circle';
import { View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import FullScreen from 'ol/control/FullScreen';
import Zoom from 'ol/control/Zoom';
import ScaleLine from 'ol/control/ScaleLine';
import XYZ from 'ol/source/XYZ';
import Map from "ol/Map";
import GeoJSON from "ol/format/GeoJSON";
import Text from 'ol/style/Text';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { LineStyle } from '../extra/LineStyle';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { defaultStyle, lineStringStyle, pointStyle, polygonStyle } from '../dashboard/Helper';

@Component({
  selector: 'app-sitedetail',
  templateUrl: './sitedetail.component.html',
  styleUrls: ['./sitedetail.component.scss']
})
export class SitedetailComponent {
  niveau: any;
  selectedNiveau: any;

  projets: any;
  selectedProjet: any;

  marches: any;
  selectedMarche: any;

 public mapPrevLine:any ;


  resultEvolution: any;
  resultRadar: any;
  lines = new LineStyle(
    "Normal",
    "center",
    "middle",
    "0",
    "Arial",
    "Bold",
    "Point",
    "0.7853981633974483",
    true,
    "12px",
    "10",
    "3px",
    "4px",
    "black",
    "white",
    "4",
    "38400"
  );
  dataReceived: any;
  allFeatures: any;

  fuit_source = new VectorSource({wrapX: false});

  fuit_vector = new VectorLayer({
    source: this.fuit_source,
    style: (feature, resolution) => {
     const geometryType = feature.getGeometry().getType();
 
     if (geometryType === 'Point') {
       return pointStyle(feature, resolution);
     } else if (geometryType === 'LineString') {
       return lineStringStyle(feature, resolution);
     } else if (geometryType === 'Polygon') {
       return polygonStyle(feature, resolution);
     }
 
     return defaultStyle;
   },
  });
  dataIsHere: boolean = false ;
  site: any ;
  image: string;
  @ViewChild('buttonContainer', { static: true }) buttonContainer!: ElementRef;

 constructor(private route: ActivatedRoute,private service:ServiceService,private router:Router) {
  
  this.image = this.service.imagePathBase;

 }

 





 source = new VectorSource({wrapX: false});

 vector = new VectorLayer({
  source: this.source,
  style:  (feature,resolution)=> {
    const geometryType = feature.getGeometry().getType();

    if (geometryType === 'Point') {
      return pointStyle(feature,resolution);
    } else if (geometryType === 'LineString') {
      return lineStringStyle(feature,resolution);
    } else if (geometryType === 'Polygon') {
      return polygonStyle(feature,resolution);
    }

    return defaultStyle;
  },
});

 format:GeoJSON = new GeoJSON()



 populatesource(res) {
  console.log(res)
  const geom = [];

  if (res !== null) {
   
      for (let sites of res.sites) {

        geom.push(
          {

            "type": "Feature",
            "properties": res,
            "geometry": sites.geom
          }
        )
      }
    



  }

  console.log(geom)

  if (res !== null) {
    for (let ele of geom) {

      this.source.addFeatures(this.format.readFeatures(ele)
      )
    }
  }

  this.allFeatures = this.source.getFeatures();

}

populateFuitessource(res) {
  console.log(res)
  const geom = [];

  if (res !== null) {
 
      for (let f of res.fuites) {

        geom.push(
          {

            "type": "Feature",
            "properties": f,
            "geometry": {
              "coordinates": [
                f.longitude,
                f.latitude
              ],
              "type": "Point"
            }
          }
        )
      }
 



  }

  console.log(geom)

  if (res !== null) {
    for (let ele of geom) {

      this.fuit_source.addFeatures(this.format.readFeatures(ele)
      )
    }
  }

  console.warn(geom)

}


  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      // Retrieve the data passed from the source component
      console.log(params)
      this.dataReceived = params;

      this.service.getspace(this.dataReceived.id).subscribe(res=>{

        this.site = res;
        this.dataIsHere =  true;
        this.populatesource(res)
        this.populateFuitessource(res)
        console.log(res)
      },err=>{
        if(err.error.error.includes('The Token has expired on')){
          // this.service.toastMessage("info","votre session a été expiré")
        this.router.navigateByUrl('/login'); 
      }
      })
    });
    

    this.mapPrevLine= new Map({
      target: "mapPrev1",
      layers: [  new TileLayer({
        source: new XYZ({
          url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}'
        })
      }),this.vector,this.fuit_vector ],
      controls: [
       new FullScreen(),
       new Zoom(),
       new ScaleLine({ bar: true })
     ],
      view: new View({
       center: [
        -3.043618238384593 , 35.159219337440405
       ],
        zoom: 10,
        projection: "EPSG:4326",
      }),
    });


    this.source.on('addfeature', () =>{
      this.mapPrevLine.getView().fit(
          this.source.getExtent(),
          { duration: 1000, size: this.mapPrevLine.getSize(), maxZoom: 8 }
      );
  });


    // this.getnewvqlues()
  }


  ask(){
    const button = document.createElement('button');
    button.innerText = 'Click me';
    button.style.visibility = 'hidden'; // Set the initial visibility to hidden
    button.setAttribute('data-bs-toggle', 'modal'); // Set the data-bs-toggle attribute
    button.setAttribute('data-bs-target', '#askuser'); // Set the data-bs-target attribute
    button.addEventListener('click', () => {
      console.log('Button clicked');
    });



    // Add the button element to the container element
    this.buttonContainer.nativeElement.appendChild(button);
    button.click()
  }
  suprimer(){

    this.service.deleteEspaceVert(this.site.id).subscribe(res=>{
      console.log(res);
      this.router.navigate(['/dashboard']);
    },err=>{
      if(err.error.error.includes('The Token has expired on')){
        // this.service.toastMessage("info","votre session a été expiré")
      this.router.navigateByUrl('/login'); 
    }
    })
  }
 

 


  Editer(){

    this.router.navigate(['/editer'], { queryParams: this.site });

  }


  


 

   
}
