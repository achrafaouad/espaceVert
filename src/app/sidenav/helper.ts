import { animate, style, transition, trigger } from "@angular/animations";
import CircleStyle from 'ol/style/Circle';
import Icon from 'ol/style/Icon';

import { View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import FullScreen from 'ol/control/FullScreen';
import Zoom from 'ol/control/Zoom';
import ScaleLine from 'ol/control/ScaleLine';
import XYZ from 'ol/source/XYZ';
import Map from "ol/Map";
import GeoJSON from "ol/format/GeoJSON";
import Text from 'ol/style/Text';

import { ServiceService } from '../service.service';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { LineStyle } from '../extra/LineStyle';
import Vector from 'ol/source/Vector';

export interface INavbarData {
    routeLink: string;
    icon?: string;
    label: string;
    expanded?: boolean;
    items?: INavbarData[];
}



export const lines = new LineStyle(
  "Normal",
  "center",
  "middle",
  "0",
  "6px Arial",
  "Bold",
  "Point",
  "0.7853981633974483",
  true,
  "8px",
  "10",
  "3px",
  "4px",
  "black",
  "white",
  "4",
  "38400"
);
export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
      style({opacity: 0}),
      animate('350ms',
        style({opacity: 1})
      )
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate('350ms',
        style({opacity: 0})
      )
    ])
  ])



  export const geoJsonData = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "name": "port"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-3.166392823189881, 35.24525615061543],
              [-3.1896789486479236, 35.22803372376383],
              [-3.185645131639859, 35.22339053082072],
              [-3.181244603994628, 35.22428923406049],
              [-3.1731769699774475, 35.22938169775669],
              [-3.170609995517083, 35.235222659595294],
              [-3.1634591380923496, 35.241512455856935],
              [-3.166392823189881, 35.24525615061543]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Nador"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-2.929212149424501, 35.17374706629958]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "El Aaroui"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-3.012291296323184, 35.00776778078237]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Driouch"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-3.397075016006852, 34.97590514284197]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "kassita"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-3.7279861617920176, 34.8914410001363]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "saka"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-3.412485812234138, 34.61763384755035]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Guersif"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-3.3517302817878942, 34.227927997474694]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Taourirt"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-2.8951785481574746, 34.420845290549394]
        }
      }
    ]
  };

  

export const portIcon = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -3.1720773669415223,
          35.239447937388235
        ],
        "type": "Point"
      }
    }
  ]
};

export const iconStyle = new Style({
  image: new Icon({
    src: './cargo-shipo.png', // Replace with the actual path to your icon image
    imgSize: [32, 32], // Specify the size of the icon image
    anchor: [0.5, 1], // Adjust the anchor point if needed
  }),
});


  export const  pointStyle = (feature,resolution)=> { 
  
    const name  = feature.get("intitule")
    const avReel  = feature.get("avReel")
    const longeur  = feature.get("length")
    let color: string;

    if (avReel >= 0 && avReel < 30) {
      color = "red";
    } else if (avReel >= 30 && avReel <= 60) {
      color = "orange";
    } else if (avReel > 60) {
      color = "green";
}
    return new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({ color: color }),
      stroke: new Stroke({ color: 'white', width: 2 }),
    }),
  
  
      text:new Text({
        scale:[1.3,1.3],
        textAlign:  'center',
      textBaseline: <string>lines.baseline,
      font: <string>lines.font,
      text: (0.002362464157453313<resolution)?'': "Lot: "+  name +"/avReel : "+  (avReel?avReel.toFixed(2):0)+ "%",
      fill: new Fill({ color: "blue" }),
      stroke: new Stroke({ color: "white", width: 3 }),
      backgroundFill: new Fill({
        color: color
      }),
      backgroundStroke: new Stroke({
        color: 'white',
        width: 2
      }),
      padding: [4, 6, 4, 6],
      offsetX: 0,
      offsetY: -40,
      placement: "point",
      maxAngle: 45,
      overflow: lines.overflow,
      rotation: <any>lines.rotation,
    
      
      }),
  
  })};
  export const  pointStyle1 = (feature,resolution)=> { 
  
    const name  = feature.get("name")
    
    return new Style({
    
  
  
    text:new Text({
      scale:[1.3,1.3],
      textAlign:  'center',
    textBaseline: <string>lines.baseline,
    font: <string>lines.font,
    text: (0.002362464157453313<resolution)?'': name,
    fill: new Fill({ color: "blue" }),
    stroke: new Stroke({ color: "white", width: 3 }),
    backgroundFill: new Fill({
      color: '#7394c9'
    }),
    backgroundStroke: new Stroke({
      color: 'white',
      width: 2
    }),
    padding: [4, 6, 4, 6],
    offsetX: 0,
    offsetY: -10,
    placement: "point",
    maxAngle: 45,
    overflow: lines.overflow,
    rotation: <any>lines.rotation,
  
    
    }),
  
  })};
  
  export const  lineStringStyle = (feature,resolution)=>{
    console.error(feature)
    const name  = feature.get("intitule")
    const avReel  = feature.get("avReel")
    const longeur  = feature.get("length")
    let color: string;

    if (avReel >= 0 && avReel < 30) {
      color = "red";
    } else if (avReel >= 30 && avReel <= 60) {
      color = "orange";
    } else if (avReel > 60) {
      color = "green";
}

    return new Style({
    stroke: new Stroke({
      color: color,
      width: 2,
    }),
    text:new Text({
      scale:[1.3,1.3],
      textAlign:  'center',
    textBaseline: <string>lines.baseline,
    font: <string>lines.font,
    text: (0.002362464157453313<resolution)?'': "Lot: "+  name +"/avReel : "+ (avReel?avReel.toFixed(2):0) + "%/ longeur : "+  100 *longeur.toFixed(2) +"km",
    fill: new Fill({ color: "blue" }),
    stroke: new Stroke({ color: "white", width: 3 }),
    offsetX: 0,
    backgroundFill: new Fill({
      color: color
    }),
    backgroundStroke: new Stroke({
      color: 'white',
      width: 2
    }),
    padding: [4, 6, 4, 6],
    offsetY: -15,
    placement: "point",
    maxAngle: 45,
    overflow: lines.overflow,
    rotation: <any>lines.rotation,
    
    
    })


  })}
  
  ;
  
  export const polygonStyle = (feature,resolution)=>{
    const name  = feature.get("intitule")
    const avReel  = feature.get("avReel")
    const longeur  = feature.get("length")
    let color: string;

    if (avReel >= 0 && avReel < 30) {
      color = "red";
    } else if (avReel >= 30 && avReel <= 60) {
      color = "orange";
    } else if (avReel > 60) {
      color = "green";
}
    
    return new Style({
      stroke: new Stroke({
        color: "orange",
        width: 5,
      }),
      fill: new Fill({
        color: "red",
      }),
      text:new Text({
        scale:[1.3,1.3],
        textAlign:  'center',
      textBaseline: <string>lines.baseline,
      font: <string>lines.font,
      text: (0.002362464157453313<resolution)?'': "Lot: "+  name +"/avReel : "+  (avReel?avReel.toFixed(2):0) + "%",
      fill: new Fill({ color: "blue" }),
      stroke: new Stroke({ color: "white", width: 3 }),
      backgroundFill: new Fill({
        color: color
      }),
      backgroundStroke: new Stroke({
        color: 'white',
        width: 2
      }),
      padding: [4, 6, 4, 6],
      offsetX: 0,
      offsetY: -15,
      placement: "point",
      maxAngle: 45,
      overflow: lines.overflow,
      rotation: <any>lines.rotation,
      
      
      })
    });
  } 
  export const polygonStyle1 = (feature,resolution)=> new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
    text:new Text({
      scale:[1.3,1.3],
      textAlign:  'center',
    textBaseline: <string>lines.baseline,
    font: <string>lines.font,
    text: (0.002362464157453313<resolution)?'': feature.get("intitule"),
    fill: new Fill({ color: "blue" }),
    stroke: new Stroke({ color: "white", width: 3 }),
    offsetX: 0,
    offsetY: -15,
    placement: "point",
    maxAngle: 45,
    overflow: lines.overflow,
    rotation: <any>lines.rotation,
    
    
    })
  });
