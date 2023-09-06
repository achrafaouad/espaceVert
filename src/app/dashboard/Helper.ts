import { Circle, Fill, Stroke, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import { LineStyle } from "./LineStyle";
import Text from 'ol/style/Text';
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { bbox as bboxStrategy } from 'ol/loadingstrategy';

const  lines = new LineStyle(
    "Normal",
    "center",
    "middle",
    "0",
    "6px Arial",
    "Bold",
    "Point",
    "0.7853981633974483",
    true,
    "5px",
    "10",
    "3px",
    "4px",
    "black",
    "white",
    "4",
    "38400"
  );
export  const pointStyle = (feature,resolution) =>  new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({ color: 'green' }),
      stroke: new Stroke({ color: 'white', width: 2 }),
    }),

    
    text:new Text({
      scale:[1.3,1.3],
      textAlign:  'center',
    textBaseline: <string> lines.baseline,
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
  
  export  const  lineStringStyle = (feature,resolution)=>  new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 2,
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
  
  export  const  polygonStyle = (feature,resolution)=>{

    console.error(feature.get("fuite"));

    var color = feature.get("fuite")?'rgba(255, 0, 0, 0.2)':"rgba(0, 223, 162,0.2)"
    var colord = feature.get("fuite")?'rgba(255, 0, 0, 1)':"rgba(0, 223, 162,1)"


    const fullDesignation = feature.get("designation");

    // Determine the maximum length you want to display
    const maxLength = 20; // You can adjust this value

    const shortenedDesignation =
    fullDesignation.length > maxLength
      ? fullDesignation.slice(0, maxLength) + "..." // Display the first maxLength characters and add "..."
      : fullDesignation;

    return  new Style({

    
      stroke: new Stroke({
        color: "orange",
        width: 2,
      }),
      fill: new Fill({
        color: color,
      }),
      text:new Text({
        scale:[1.3,1.3],
        textAlign:  'center',
      textBaseline: <string>lines.baseline,
      font: <string>lines.font,
      text: (0.00001062464157453313<resolution)?'': shortenedDesignation,
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
  } 
 
  
  export  const  defaultStyle = new Style({
    fill: new Fill({ color: 'gray' }),
    stroke: new Stroke({ color: 'black', width: 1 }),
  });




  export const style = new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.6)'
    }),
    stroke: new Stroke({
      color: '#319FD3',
      width: 1
    }),
    image: new Circle({
      radius: 5,
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.6)'
      }),
      stroke: new Stroke({
        color: '#319FD3',
        width: 1
      })
    })
  });
  export const style2 = new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.6)'
    }),
    stroke: new Stroke({
      color: '#319FD3',
      width: 1
    }),
    image: new Circle({
      radius: 5,
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.6)'
      }),
      stroke: new Stroke({
        color: '#319FD3',
        width: 1
      })
    })
  });



  export const basemapimageo2 = new TileLayer({
    visible: true,
    source: new XYZ({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    })
  });
  export const basemapimageo1 = new TileLayer({
    visible: true,
    source: new XYZ({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    })
  });

  export const titles2o2 = new TileLayer({
    visible: true,
    source: new XYZ({
      url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
    })
  });
  export const titles2o1 = new TileLayer({
    visible: true,
    source: new XYZ({
      url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
    })
  });




  export const regionSource = new VectorSource({
    format: new GeoJSON(),

    url: (extent) => {
      return ("http://localhost:8080/geoserver/i2singineerie/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=i2singineerie:region&outputFormat=application/json&" +
        'bbox=' + extent.join(',') + ',EPSG:4326');
    },
    strategy: bboxStrategy,

  });


  // Add the buffered layer to the map

  export const provinceSource = new VectorSource({
    format: new GeoJSON(),

    url: (extent) => {
      return ("http://localhost:8080/geoserver/i2singineerie/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=i2singineerie:province&outputFormat=application/json&" +
        'bbox=' + extent.join(',') + ',EPSG:4326');
    },
    strategy: bboxStrategy,

  });
  export const communeSource = new VectorSource({
    format: new GeoJSON(),

    url: (extent) => {
      return ("http://localhost:8080/geoserver/i2singineerie/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=i2singineerie:communes&outputFormat=application/json&" +
        'bbox=' + extent.join(',') + ',EPSG:4326');
    },
    strategy: bboxStrategy,

  });


  export const arbres: string[] = [
    "Abies pinsapo \"marocana\"",
    "Acacia Vestita",
    "Acacia cyanophylla",
    "Acacia cyclops",
    "Acacia dealbata",
    "Acacia decurrens (mollisima)",
    "Acacia horrida (karro)",
    "Acacia gummifera",
    "Acacia longifolia",
    "Acacia podalyraefolia",
    "Acacia retinoïdes",
    "Acer monspessulanum",
    "Acer negundo",
    "Acer pseudoplatanus",
    "Acer p. \"Atropurpureus\"",
    "Aesculus hippocastanum",
    "Ailanthus altissima",
    "Albizia julibrissin",
    "Albizia lophantha",
    "Alnus glutinosa",
    "Annona cherimolia",
    "Araucaia bidwilii",
    "Araucaia columnari",
    "Araucaia excelsa",
    "Arbutus unedo",
    "Argania spinosa",
    "Bauhinia forficata",
    "Bauhinia purpurea",
    "Beaucarnea recurvata",
    "Brachychiton acerifolium",
    "Brachychiton populneum",
    "Broussonetia papyrifera",
    "Caesalpinia gillesii",
    "Callistemon lanceolatum",
    "Calodendron capensis",
    "Carica papaya",
    "Carya illinoensis (Pacanier)",
    "Casimiroa edulis",
    "Cassia spectabilis",
    "Casuarina cunninghamiana",
    "Casuarina stricta",
    "Catalpa bignonoïdes",
    "Cedrus atlantica",
    "Celtis australis",
    "Ceratonia siliqua",
    "Cercis siliquatrum",
    "Chorisia speciosa",
    "Cinnamomum zeylanicum",
    "Citharexylum elicifolium",
    "Citharexylum quadrangularis",
    "Citrus aurantium",
    "Coccoloba grandifolia",
    "Cocculus laurifolius",
    "Cordyline australis",
    "Cupressus arizonica",
    "Cupressus atlantica",
    "Cupressus macrocarpa",
    "Cupressus sempervirens",
    "Cupressus s. \"Stricta\"",
    "Cupressus s. \"Horisontalis\"",
    "Delonix regia",
    "Diospyros kaki",
    "Dombeya X Cayeuxii",
    "Dombeya X tiliacea",
    "Eleagnus ongustifolia",
    "Enterolobium contortisiliqum",
    "Eriobotrya japonica",
    "Erythrina caffra",
    "Erythrina cristagalli",
    "Erythrina flabelliformis",
    "Eucalyptus camaldulensis",
    "Eucalyptus ficifolia",
    "Eucalyptus gomphocephala",
    "Eucalyptus occidentalis",
    "Eucalyptus robusta",
    "Eucalyptus sideroxylon",
    "Euphorbia canariensis",
    "Euphorbia candelabrum",
    "Euphorbia tirucalli",
    "Feijoa sellowiana",
    "Ficus altissima",
    "Ficus benjamina",
    "Ficus capensis",
    "Ficus carica",
    "Ficus elastica",
    "Ficus glomerata",
    "Ficus lyrata",
    "Ficus macrophylla",
    "Ficus microcarpa",
    "Ficus mysorensis",
    "Ficus religiosa",
    "Ficus rubiginosa",
    "Ficus sycomorus",
    "Ficus utilis",
    "Ficus virens",
    "Firmiana simplex",
    "Fraxinus angustifolia",
    "Fraxinus excelsior",
    "Fraxinus lanceolata",
    "Gleditchia triacanthos",
    "Gleditchia t. \"inermis\"",
    "Grevillea robusta",
    "Harpulia pendula",
    "Jacaranda mimosifolia",
    "Juglans rejia",
    "Kigelia agficana",
    "Koelreuteria paniculata",
    "Lagerstroemia indica",
    "Laurus nobilis",
    "Ligustrum lucidum",
    "Liquidambar styraciflua",
    "Lucuma nervosa",
    "Macadamia integrifolia",
    "Maclura pomifera",
    "Magnolia grandiflora",
    "Malus ssp. \"prumila\"",
    "Mangigera indica",
    "Melaleuca quinquenervia",
    "Melia azedarach",
    "Metrosideros excelsus",
    "Morus alba",
    "Morus nigra",
    "Myoporum laetum",
    "Olea europea",
    "Olea oleaster",
    "Oreopanax capitatum",
    "Pachira insignis",
    "Parkinsonia aculeata",
    "Persea americana",
    "Photinia serrulata",
    "Phytolacca dioïca",
    "Pinus canariensis",
    "Pinus halepensis",
    "Pinus pinaster",
    "Pinus pinea",
    "Pinus radiata",
    "Pinus roxbungii",
    "Pistacia atlantica",
    "Pistacia vera",
    "Pittosporum tobira",
    "Pittosporum undulatum",
    "Platanus acerifolia",
    "Plumeria rubra",
    "Populus alba",
    "Populus euphratica",
    "Populus euramericana",
    "Populus nigra",
    "Populus simonii",
    "Prosopis juliflora",
    "Prunus cerasifera X pissardii",
    "Prunus laurocerasus",
    "Prunus lusitanica",
    "Psidium guajava",
    "Quercus ilex",
    "Quercus palustris",
    "Quercus pubescens",
    "Quercus robur",
    "Quercus suber",
    "Robinia hispida",
    "Robinia pseudoacacia",
    "Salix alba",
    "Salix babylonica",
    "Sapindus saponaria",
    "Schinus dependens",
    "Schinus molle",
    "Schinus therebinthifolius",
    "Sophora japonica",
    "Spathodia campanulata",
    "Strelitzia augusta",
    "Synzygium cuminii",
    "Tamarix africana",
    "Tamarix aphylla",
    "Taxodium disticum",
    "Tecoma stans",
    "Tetraclinis articulata",
    "Tetrapanax papyriferus",
    "Thevetia peruviana",
    "Thuya orientalis",
    "Tilia platyphyllos",
    "Tipuana tipu",
    "Ulmus campestris",
    "Hoivenia dulcis",
    "Yucca elephantipes",
    "Ziziphus jujuba"
  ];
  

  // Define an array of palm tree species
  export const palmiers: string[] = [
    'Butia capitata',
    'Chamaerops humilis',
    'Phoenix canariensis',
    'Phoenix dactylifera',
    'Phoenix roebelenii',
    'Washingtonia filifera',
    'Washingtonia robusta',
  ];


// Define an array of plant species
export const arbustes: string[] = [
'Abelia rupestris',
'Abutilon striatum',
'Acalypha wilkisiana "abovata"',
'Acokanthera spectabilis',
'Artemisia absinthium',
'Atriplex halimus',
'Atriplex numularia',
'Aucuba japonica',
'Buxus balearica',
'Buxus  sempervirens',
'Calliandra pulcherrima',
'Callistemon citrinus',
'Callistemon speciosus',
'Callistemon rigidus',
'Chimonanthus praecox',
'Carissa grandiflora',
'Cassia  alata',
'Cassia  corymbosa',
'Cestrum diurnum',
'Cestrum * Newelii',
'Cestrum nocturnum',
'Cistus  monspeliensis',
'Cistus  salvifolius',
'Cistus villosus',
'Coprosma lucida',
'Cornus  sanguinea',
'Cotoneaster lacteus',
'Corylus avellana',
'Crataegus  oxyacantha',
'Cycas revoluta',
'Cydonia maliformis',
'Cytisus battandieri',
'Datura  arborea',
'Datura  cornigea',
'Datura  sanguinea',
'Datura  suaviolens',
'Deutzia scabra (gracillis)',
'Dizygotheca elegantissima',
'Dombeya mastersii',
'Dracaena dermensis',
'Dracaena fragrans',
'Dracaena marginata',
'Duranta repens',
'Elaeagnus pungens',
'Erica arborea',
'Eugenia uniflora',
'Eugenia myrtifolia',
'Eriocephalus lanatus',
'Euonymus  japonicus',
'Euonymus  j."aureovariegatus"',
'Euonymus  j."mediopictum"',
'Euonymus  j."microphyllus"',
'Euonymus  j."microphyllus variegatus"',
'Euphorbia milii',
'Euphorbia pulcherrima',
'Exochorda racemosa',
'Fatsia japonica',
'Fortunella marginata',
'Fuchsia arborescens',
'Fuchsia corymbiflora',
'Fuchsia hybrid',
'Fuchsia magellanica',
'Gardenia jasminoïdes',
'Grewia occidentalis',
'Hibiscus mutabilis',
'Hibiscus rosa-sinensis',
'Hibiscus syriacus',
'Hydrangea macrophylla',
'Ilex  aquifolium',
'Iochroma grandiflora',
'Jacobinia carnea',
'Jasminum odoratissimum',
'Justicia adhatoda',
'Justicia coccinea',
'Lantana camara',
'Lawsonia alba',
'Leucaena leucocephala',
'Ligustrum lucidum',
'Ligustrum ovalifolium',
'Ligustrum O. "albomarginatum"',
'Ligustrum O. "aureomarginatum"',
'Lippia citriodora',
'Mahonia aquifolium',
'Malvaviscus penduliflorus',
'Mimosa pudica',
'Montanoa bipinatifida',
'Murraya paniculata',
'Nandina domestica',
'Nerium  oleander',
'Nolina longifolia',
'Pereskia grandiflora',
'Philadelphus coronarius',
'Pistacia terebinthus',
'Punica  granatum',
'Punica  g. "nana"',
'Pyracantha crenulata',
'Raphiolepis indica',
'Retama monosperma',
'Rhamnus alaternus',
'Rhus pentaphylla',
'Ricinus communis',
'Ricinus sanguineus',
'Romneya coulteri',
'Rosmarinus officinalis',
'Rosa sp.',
'Ruscus acculeatus',
'Ruta gravioleus',
'Salvia  officinalis',
'Sorbaria arborea',
'Spartium junceum',
'Spirea thumbergii',
'Syringa vulgaris',
'Taxus  baccata',
'Teucrium fruticans',
'Thuya orientalis',
'Tithonia speciosa',
'Viburnum lantana',
'Viburnum tinus',
'Vitex agnus-castus',
'Yucca aloîfolia',
'Yucca a. "glauca"',
'Yucca a. "variegata"',
'Yucca filamentosa',
'Yucca gloriosa',
];


export const gazon: string[] = [
  'Paspalum vaginatum',
  'Pennisetum clandestinum',
  'Stenotaphrum secundatum',
  'zoyzia',
   ];
// You can now use the "plantSpecies" array in your TypeScript code

// You can now use the "palmTreeSpecies" array in your TypeScript code


  // You can now use the plantList array in your TypeScript code.
  