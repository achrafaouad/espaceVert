import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import LayerTile from "ol/layer/Tile";
import { View } from 'ol';
import Map from "ol/Map";
import OSM from 'ol/source/OSM';
import FullScreen from 'ol/control/FullScreen';
import ScaleLine from 'ol/control/ScaleLine';
import Zoom from 'ol/control/Zoom';
import VectorSource from 'ol/source/Vector';
import olVectorLayer from "ol/layer/Vector";
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import GeoJSON from "ol/format/GeoJSON";
import {ZoomToExtent, defaults as defaultControls} from 'ol/control';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-agent-profil',
  templateUrl: './agent-profil.component.html',
  styleUrls: ['./agent-profil.component.scss']
})
export class AgentProfilComponent implements OnInit {

  id:Number | undefined;
  mapPrevLine: any;
  user: any;
  format = new GeoJSON();
  dataLinePrev: String[] = [];
  mediumLowAnnsrc: any;
  mediumLowAnn: any;
  Animal =  new Style({
    stroke: new Stroke({
      color: 'rgba(100, 255, 0, 1)',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(100, 255, 0, 0.3)',
    }),

  })
  view: any;
  
  constructor( private lrsServiceService :ServiceService, private route:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {

    

    this.mediumLowAnnsrc = new VectorSource();

    this.mediumLowAnn = new olVectorLayer({
  
      source: this.mediumLowAnnsrc,

      style: this.Animal ,
    });

   this.view=   new View({
    center: [
      813079.7791264898, 5929220.284081122
    ],
    zoom: 10,
    projection: "EPSG:3857",
  });
   
    this.mapPrevLine = new Map({
      target: "mapPrevLine",
      layers: [  ],
      controls: [
        new FullScreen(),
        new Zoom(),
        new ScaleLine({ bar: true }),
          new ZoomToExtent({
            extent: [
              813079.7791264898, 5929220.284081122, 848966.9639063801,
              5936863.986909639,
            ],
          }),
      ],
      view:this.view
    });

    this.mapPrevLine.addLayer(new LayerTile({
      visible: true,
      source: new OSM(),
    } ));
    this.mapPrevLine.addLayer(this.mediumLowAnn);



    this.route.params.subscribe((params:Params)=>{ 
      this.id= +params['id'];
      console.log(this.id);
      this.user = this.lrsServiceService.getUserByid(this.id);
      // this.agent = this.lrsServiceService.getuserById(this.id);
    
      this.dataLinePrev = [];
   
      
    }
    ) 

  }

  hasprofile(){
    if(this.user.profil){
      return true
    }
    return false
  }

  navigateToAccount(){ 
    console.log("hello")
    this.router.navigate(["edit"], {relativeTo:this.route});
  }

  getCenterOfExtent(Extent:any){
    var X = Extent[0] + (Extent[2]-Extent[0])/2;
    var Y = Extent[1] + (Extent[3]-Extent[1])/2;
    return [X, Y];
    }

}
