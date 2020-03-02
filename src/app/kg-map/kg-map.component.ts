import {Component, Input, OnInit} from '@angular/core';
import {SelectResultSet} from "../../model/sparql";
import {SparqlService} from "../sparql.service";
import {Observable} from "rxjs";

import 'ol/ol.css';
import {useGeographic} from 'ol/proj';
import {Map, View} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';

import {MousePosition, OverviewMap, Zoom, FullScreen} from "ol/control";
import {Circle, Fill, Style} from "ol/style";
import {defaults as defaultInteractions, DragPan} from 'ol/interaction';

@Component({
  selector: 'kg-map',
  templateUrl: './kg-map.component.html',
  styleUrls: ['./kg-map.component.css']
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
        console.log(features);
        overlay.getSource().addFeatures(features);
      }, error => {
        this.finished = true;
        this.errorMessage = JSON.stringify(error);
      });

  }

  private static createMap() {
    useGeographic();

    // bolzano
    var place = [11.33982, 46.49067];

    const overlay = new VectorLayer({
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

    var map = new Map({
      target: 'map',
      view: new View({
        center: place,
        zoom: 8
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        overlay
      ],
      interactions: [
        new DragPan(),
      ],
      controls: [
        new OverviewMap(),
        new Zoom(),
        new MousePosition(),
        new FullScreen()
      ]
    });
    return overlay;
  }
}
