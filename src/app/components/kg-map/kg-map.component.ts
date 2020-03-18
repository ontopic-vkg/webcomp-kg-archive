import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

import {Observable} from "rxjs";
import {toLonLat, useGeographic} from 'ol/proj';
import {Map, Overlay, View} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';

import {MousePosition, OverviewMap, Zoom, FullScreen} from "ol/control";
import {Circle, Fill, Style} from "ol/style";
import {defaults as defaultInteractions, DragPan} from 'ol/interaction';

import {Point} from "ol/geom";
import {SparqlService} from "../../sparql.service";
import {SelectResultSet} from "../../../model/sparql";



@Component({
  selector: 'kg-map',
  templateUrl: './kg-map.component.html',
  styleUrls: ['./kg-map.component.css'],
})
export class KgMapComponent implements OnInit {

  @Input() endpoint: string;

  @Input() errorMessage = '';

  @Input() query: string;

  results: SelectResultSet;

  finished: boolean = false;

  constructor(private sparqlService: SparqlService) {

  }

  ngOnInit(): void {
    const overlay = KgMapComponent.createMap();

    this.sparqlService.endpoint = this.endpoint;
    this.sparqlService.select(this.query)
      .subscribe(value => {
        this.finished = true;
        this.results = value;
        const features = this.sparqlService.asFeatures(value);
        //console.log(features);
        overlay.getSource().addFeatures(features);
      }, error => {
        this.finished = true;
        this.errorMessage = JSON.stringify(error);
      });

  }

  private static createMap() {
    useGeographic();

    // bolzano
    const place = [11.33982, 46.49067];

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: []
      }),
      style: new Style({
        image: new Circle({
          radius: 4,
          fill: new Fill({color: 'red'})
        })
      })
    });

    const osmLayer = new TileLayer({
      source: new OSM()
    });


    /**
     * Elements that make up the popup.
     */
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');


    /**
     * Create an overlay to anchor the popup to the map.
     */
    var overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    closer.onclick = () => {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

    var map = new Map({
      interactions: defaultInteractions({
        /* onFocusOnly caused trouble. It has to be disabled */
        //onFocusOnly: true
      }),
      target: 'map',
      view: new View({
        center: place,
        zoom: 8
      }),
      layers: [
        osmLayer,
        vectorLayer
      ],
      overlays: [
        overlay
      ],
      controls: [
        new OverviewMap(),
        new Zoom(),
        new MousePosition(),
        new FullScreen()
      ]
    });

    map.on('singleclick', function(evt) {
      var coordinate = evt.coordinate;

      var feature = map.getFeaturesAtPixel(evt.pixel)[0];
        if (feature) {
          const coordinate = (feature.getGeometry() as Point).getCoordinates();
          const label = feature.get('label');
          content.innerHTML = label;
          overlay.setPosition(coordinate);
        }
    });

    map.on('pointermove', (event) => {
      if (map.hasFeatureAtPixel(event.pixel)) {
        map.getViewport().style.cursor = 'pointer';
      } else {
        map.getViewport().style.cursor = 'inherit';
      }
    });

    return vectorLayer;
  }
}
