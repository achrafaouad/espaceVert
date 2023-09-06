import { ServiceService } from './../service.service';
import { MohammedService } from './../mohammed.service';
import { TimeService } from './../time.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Feature, Overlay, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import FullScreen from 'ol/control/FullScreen';
import Draw from 'ol/interaction/Draw';
import Zoom from 'ol/control/Zoom';
import ScaleLine from 'ol/control/ScaleLine';
import XYZ from 'ol/source/XYZ';
import Map from "ol/Map";
import GeoJSON from "ol/format/GeoJSON";
import { pointStyle, lineStringStyle, polygonStyle, defaultStyle, style, style2, basemapimageo1, basemapimageo2, titles2o2, titles2o1, provinceSource, communeSource, regionSource, arbres, palmiers, arbustes, gazon } from "./Helper";

import { Time } from '@angular/common';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

export interface lot {

  intitule: string;
  observation: string;
  pkd: number;
  pkf: number;
  montant: number;
  sections: any
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public myDataArray: any;
  panelOpenState = true;
  addFuite: boolean = false;
  editFuite: boolean = false;
  removeSite: boolean = false;
  proviceList = new Set();
  province!: string
  objet: any = null
  Annee: any = null
  mot_cle: any = null
  observation_project: any = null
  mapPrevLine: any
  format: GeoJSON = new GeoJSON()
  intitulelot!: string
  observationlot!: string
  pkdlot!: number
  pkflot!: number
  montantlot!: number
  lotList = new Set();
  filteredFeatures: Feature[] = [];
  arbresList:any[]=arbres;
  palmiersList:any[]=palmiers;
  arbustesList:any[]=arbustes;
  gazonList:any[]=gazon;
  currentDate!: string;
  currentTime!: string;
  sum: number = 0;
  showInfo: boolean = false
  @ViewChild('buttonContainer', { static: true }) buttonContainer!: ElementRef;

  sections: any = []
  lots: any = []

  columnsToDisplay: string[] = ["intitulelot", "observationlot", "pkdlot", "pkflot", "montantlot", "actions"];

  public USER_DATA: lot[] = []

  public newLot = { intitule: "", observation: "", pkd: 0, pkf: 0, montant: 0, sections: [] };
  value: any;
  draw: any;

  view = new View({
    center: [
      0, 0
    ],
    zoom: 5.5,
    projection: "EPSG:4326",
  });

  source = new VectorSource({ wrapX: false });

  newSpacesource = new VectorSource({ wrapX: false });

  newSpace_vector = new VectorLayer({
    source: this.newSpacesource,
  })

  fuit_source = new VectorSource({ wrapX: false });

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

  vector = new VectorLayer({
    source: this.source,
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



  lastFeature: any;
  last_feature: any;
  latitude: number;
  longitude: number;
  container: HTMLElement;
  content: HTMLElement;
  closer: HTMLElement;
  overlay: any;
  foncier: any;
  niveau: any;
  provinces: any;
  selectedNiveau: any;
  selectedFoncier: any;
  selectedProvince: any;
  pkd: any;
  pkf: any;
  type: any;
  allFeatures: any;
  searchTerm: string;



  fuite: any = {
    date_constat: null,
    date_reparation: null,
    delais_reparation: null,
    type_fuite: null,
    type_reseau: null,
    statut: null,
  }
  id: number;
  id_spaceV: number;
  espaces: any;
  siteId: any;
  espaceVertId: any;
  image: string;


  constructor(private TimeService: TimeService, private service: ServiceService, private router: Router) {
    this.getEspacesVerts()
    console.log("constructor")
    this.currentDate = TimeService.getTime().toLocaleDateString();
    this.currentTime = TimeService.getTime().toLocaleTimeString();
    this.sum = TimeService.add(5, 2, 3, 4);
    this.image = this.service.imagePathBase;

  };




  sauvgarderFuite() {


    console.log(this.fuite)
    const fuite = { ...this.fuite }

    this.fuite = {
      date_constat: null,
      date_reparation: null,
      delais_reparation: null,
      type_fuite: null,
      type_reseau: null,
      statut: null,
    }

    console.log(fuite);

    this.service.saveFuite(this.id, fuite).subscribe(res => {
      console.log(res)
      this.getEspacesVerts()
    }, err => {
      console.log(err)

    })
  }
  updateFuite() {

    const fuite = { ...this.fuite }

    this.fuite = {
      date_constat: null,
      date_reparation: null,
      delais_reparation: null,
      type_fuite: null,
      type_reseau: null,
      statut: null,
    }

    console.log(fuite);

    this.service.updateFuite(fuite).subscribe(res => {
      console.log(res)
      this.getEspacesVerts()

    }, err => {
      console.log(err)
       if(err.error.error.includes('The Token has expired on')){
        // this.service.toastMessage("info","votre session a été expiré")
      this.router.navigateByUrl('/login'); 
    }

    })
  }


  ngOnInit(): void {

    console.log("ngOnInit")

    this.container = <HTMLElement>document.getElementById("popup");
    this.content = <HTMLElement>document.getElementById("popup-content");
    this.closer = <HTMLElement>document.getElementById("popup-closer");
    this.overlay = new Overlay({
      element: this.container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    this.closer.onclick = () => {
      this.overlay.setPosition(undefined);
      if (this.closer) this.closer.blur();
      return false;
    };
    const basemapimageo1 = new TileLayer({
      visible: true,
      source: new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      })
    });
    this.mapPrevLine = new Map({
      target: "mapPrev",
      layers: [

        basemapimageo1,
        new TileLayer({

          source: new XYZ({
            url: 'https://server.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'
          })
        }),


        this.vector, this.fuit_vector, this.newSpace_vector

      ],
      controls: [
        new FullScreen(),
        new Zoom(),
        new ScaleLine({ bar: true })
      ],
      view: this.view
    });


    this.mapPrevLine.addOverlay(this.overlay);

    this.mapPrevLine.on('click', (evt: any) => {

      this.fuite = {
        date_constat: null,
        date_reparation: null,
        delais_reparation: null,
        type_fuite: null,
        type_reseau: null,
        statut: null,
      }

      if (this.editFuite || this.addFuite) {


        this.mapPrevLine.forEachFeatureAtPixel(evt.pixel, (feature: any, Layer: any) => {

          if (this.addFuite) {
            if (this.vector === Layer) {

              console.log("trewwwwwwwwwwwww")

              const coordinates: any = this.mapPrevLine.getCoordinateFromPixel(evt.pixel);
              this.fuite.longitude = coordinates[0]
              this.fuite.latitude = coordinates[1]

              // Now you can use the coordinates variable as needed, for example, to log it or use it in your modal
              console.log('Clicked Coordinates:', coordinates);


              var object = feature.getProperties();

              this.id = object.id
              console.log(object)

            }
          }
          else if (this.editFuite) {
            if (this.fuit_vector === Layer) {
              var object = feature.getProperties();

              console.log(object)
              this.fuite = object;

            }

          }
          // call

          if (this.editFuite || this.addFuite) {
            const button = document.createElement('button');
            button.innerText = 'Click me';
            button.style.visibility = 'hidden'; // Set the initial visibility to hidden
            button.setAttribute('data-bs-toggle', 'modal'); // Set the data-bs-toggle attribute
            button.setAttribute('data-bs-target', '#staticBackdrop'); // Set the data-bs-target attribute
            button.addEventListener('click', () => {
              console.log('Button clicked');
            });
            // Add the button element to the container element
            this.buttonContainer.nativeElement.appendChild(button);
            button.click()
          }



        })
      } else





        if (this.showInfo) {
          this.mapPrevLine.forEachFeatureAtPixel(evt.pixel, (feature: any, Layer: any) => {
            var object = feature.getProperties();
            console.log(object)
            var vv

            vv = `<table id="customers" class="table-style">
              <thead>
                <tr>
                  <th colspan="2"><b>Espace Vert</b></th>
                </tr>
              </thead>
              
              <tr>
                <td><b>id </b></td>
                <td font-style="italic">${object.id}</td>
              </tr>
              <tr>
                <td><b>Désignation </b></td>
                <td font-style="italic">${object.designation}</td>
              </tr>
              <tr>
                <td><b>contient un fuite ?
                </b></td>
                <td font-style="italic">${object.fuite ? "oui" : "Non"}</td>
              </tr>
              <tr>
                <td><b>surface</b></td>
                <td font-style="italic">${object.surface}</td>
              </tr>
              <tr >
                <th colspan="2"><b> Sites </b></th>
                
              </tr>
             
            
            `;
            let index = 1;
            for (let ele of object.sites) {
              vv = vv + `
              <tr >
              <td><b>site ${index} </b></td>
              <td>${ele.name} </td>
            </tr>`
            }

            vv = vv + "</table>";



            this.content.innerHTML = vv
            console.log(evt.coordinate)
            this.overlay.setPosition(evt.coordinate)
            // toto

          })
        }
        else if(this.removeSite){
          this.mapPrevLine.forEachFeatureAtPixel(evt.pixel, (feature: any, Layer: any) => {
            var object = feature.getProperties();
            console.log(object)
            this.siteId = object.site_id;
            this.espaceVertId = object.id;

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

          })
        }

        else {
          this.mapPrevLine.forEachFeatureAtPixel(evt.pixel, (feature: any, Layer: any) => {
            if (this.vector === Layer) {
              var object = feature.getProperties();

              this.navigateToTarget(object);
            }
          })
        }

    })




    this.flyTo([-6.849443787865653,
      34.0069616775304], () => { });
  }


  /**////  geom */

  navigateToTarget(object: any) {
    const dataToPass = object;
    this.router.navigate(['/info'], { queryParams: dataToPass });
  }


  changto(val: any) {
    console.log(val);
    this.value = val
    this.mapPrevLine.removeInteraction(this.draw);
    this.addInteraction();
  }

  addInteraction() {
    // this.value ='Point';
    if (this.value !== 'None') {
      this.draw = new Draw({
        source: this.newSpacesource,
        type: this.value,
      });

      this.draw.on('drawend', (event: any) => {
        console.log('drawend');
        this.lastFeature = event.feature;
      });

      this.mapPrevLine.addInteraction(this.draw);

      this.newSpacesource.on("addfeature", (evt) => {
        var feature: any = evt.feature;

        var coords = feature.getGeometry();

        var Features: any = this.format.writeGeometry(coords);
        Features = JSON.parse(Features);
        Features["crs"] = { type: "name" };
        Features = JSON.stringify(Features);
        this.last_feature = Features;
        console.log("hana", this.last_feature);
        console.log(feature.getGeometry().getExtent())

        //center
        var center = this.getCenterOfExtent(feature.getGeometry().getExtent());
        this.latitude = center[1]
        this.longitude = center[0]

        // call
        const button = document.createElement('button');
        button.innerText = 'Click me';
        button.style.visibility = 'hidden'; // Set the initial visibility to hidden
        button.setAttribute('data-bs-toggle', 'modal'); // Set the data-bs-toggle attribute
        button.setAttribute('data-bs-target', '#addSpace'); // Set the data-bs-target attribute
        button.addEventListener('click', () => {
          console.log('Button clicked');
        });



        // Add the button element to the container element
        this.buttonContainer.nativeElement.appendChild(button);
        button.click()



      });


    }
  }

  getCenterOfExtent(Extent: number[]) {
    var X = Extent[0] + (Extent[2] - Extent[0]) / 2;
    var Y = Extent[1] + (Extent[3] - Extent[1]) + 0.005;
    return [X, Y];
  }




  getEspacesVerts() {
    this.service.espacesVerts().subscribe(res => {
      this.espaces = res
      this.source.clear();
      this.fuit_source.clear();
      this.populatesource(res)
      this.populateFuitessource(res)

    }, err => {console.log(err)
    
      if(err.error.error.includes('The Token has expired on')){
        // this.service.toastMessage("info","votre session a été expiré")
      this.router.navigateByUrl('/login'); 
    }
  
  }
    
    )
  }


  deleteSiteFromEspace(){
    this.service.deleteSiteFromEspace(this.espaceVertId,this.siteId).subscribe(res=>{
      console.log(res);
      this.fuit_source.clear()
        this.source.clear()
        this.getEspacesVerts()
    
    },err=>{ if(err.error.error.includes('The Token has expired on')){
      // this.service.toastMessage("info","votre session a été expiré")
    this.router.navigateByUrl('/login'); 
  }})
  }

  espaceSelected(eve){
  console.log(eve.target.value);
  this.id_spaceV = eve.target.value;
  }

  populatesource(res) {
    console.log(res)
    const geom = [];

    if (res !== null) {
      for (let ele of res) {
        for (let sites of ele.sites) {

         var properties = ele;
         properties["site_id"] = sites.id
          geom.push(
            {

              "type": "Feature",
              "properties": properties,
              "geometry": sites.geom
            }
          )
        }
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
      for (let ele of res) {
        for (let f of ele.fuites) {

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



  onSearch(event: any) {
    this.searchTerm = event.target.value;
    console.log(event.target.value)
    this.filteredFeatures = this.allFeatures.filter(feature => this.doesFeatureMatchSearchTerm(feature, this.searchTerm));

    if (this.filteredFeatures.length > 0) {
      // Set the vector source to only display the filtered features
      console.log("dkhel t9awed")
      console.log(this.filteredFeatures)

      this.source.clear();
      this.source.addFeatures(this.filteredFeatures);

      // Zoom to the extent of the filtered features
      this.zoomToFeatures(this.allFeatures);
    } else {
      // If no features match the search, reset the vector source to display all features
      console.log("khrej t9awed")

      this.source.clear();
      this.source.addFeatures(this.allFeatures);

      // Zoom back to the extent of all features
      this.zoomToFeatures(this.allFeatures);
    }
  }

  doesFeatureMatchSearchTerm(feature: Feature, searchTerm: string): boolean {
    // Loop through all properties of the feature and check if any value contains the search term
    const properties = feature.getProperties();
    for (const key in properties) {
      if (properties.hasOwnProperty(key)) {
        const value = properties[key];
        if (typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())) {
          console.log("true")
          return true;
        }
      }
    }
    return false;
  }

  zoomToFeatures(features: Feature[]) {


    console.log("problem")
    // If no features match the search, reset the view to the default extent

    this.mapPrevLine.getView().fit(this.vector.getSource().getExtent(), {
      size: this.mapPrevLine.getSize(),
      padding: [50, 50, 50, 50]
    });
  }


  calculatedates() {

    if (this.fuite.date_reparation && this.fuite.date_constat) {
      const timeDiff = new Date(this.fuite.date_reparation).getTime() - new Date(this.fuite.date_constat).getTime();

      // Convert the time difference to days and round it to the nearest integer
      const daysDiff = Math.round(timeDiff / (1000 * 3600 * 24));
      console.log(daysDiff)
      this.fuite.delais_reparation = daysDiff;
    }

  }

  flyTo(location: any, done: any) {
    const duration = 4000;
    const zoom = this.view.getZoom();
    let parts = 2;
    let called = false;
    function callback(complete: any) {
      --parts;
      if (called) {
        return;
      }
      if (parts === 0 || !complete) {
        called = true;
        done(complete);
      }
    }
    this.view.animate(
      {
        center: location,
        duration: duration,
      },
      callback
    );
    this.view.animate(
      {
        zoom: zoom! - 1,
        duration: duration / 2,
      },
      {
        zoom: zoom + 6,
        duration: duration / 2,
      },
      callback
    );
  }



  onSubmit(espacevertForm: NgForm) {
    console.log(espacevertForm)
    if (espacevertForm.valid) {
      const name = espacevertForm.value.name;
      const description = espacevertForm.value.description;
      const id_spaceV = espacevertForm.value.id_spaceV;
      
      // Now you can use 'name' and 'surface' as the form values
      console.log('Name:', name);
      console.log('Surface:', description);
      console.log('Surface:', id_spaceV);
       
      this.service.addSiteToSpace({
        name:name,
        description:description,
        geom:this.last_feature
      },id_spaceV).subscribe(res=>{ 
        console.log(res); // Replace 'your-route' with the actual route path
        this.fuit_source.clear()
        this.source.clear()
        espacevertForm.resetForm();
        this.getEspacesVerts()
      },err=>{ if(err.error.error.includes('The Token has expired on')){
        // this.service.toastMessage("info","votre session a été expiré")
      this.router.navigateByUrl('/login'); 
    }}
      )
    }
  


}

}
