import {Component, Input, OnInit} from '@angular/core';
import {SelectResultSet} from "../../model/sparql";
import {SparqlService} from "../sparql.service";
import {Observable} from "rxjs";
import * as $ from "jquery";
import {useGeographic} from 'ol/proj';
import {Map, Overlay, View} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';

import {MousePosition, OverviewMap, Zoom, FullScreen} from "ol/control";
import {Circle, Fill, Style} from "ol/style";
import {defaults as defaultInteractions, DragPan} from 'ol/interaction';

import 'bootstrap';
import {Point} from "ol/geom";
import OverlayPositioning from "ol/OverlayPositioning";


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
        new TileLayer({
          source: new OSM()
        }),
        overlay
      ],
      // interactions: [
      //   new DragPan(),
      // ],
      // controls: [
      //   new OverviewMap(),
      //   new Zoom(),
      //   new MousePosition(),
      //   new FullScreen()
      // ]
    });

    var element = document.getElementById('popup');

    var popup = new Overlay({
      element: element,
      positioning: OverlayPositioning.CENTER_CENTER, //'bottom-center',
      stopEvent: false,
      offset: [0, -10]
    });
    map.addOverlay(popup);

    function formatCoordinate(coordinate) {
      return ("\n    <table>\n      <tbody>\n        <tr><th>lon</th><td>" + (coordinate[0].toFixed(2)) + "</td></tr>\n        <tr><th>lat</th><td>" + (coordinate[1].toFixed(2)) + "</td></tr>\n      </tbody>\n    </table>");
    }

    var info = document.getElementById('info');
    map.on('moveend', function() {
      var view = map.getView();
      var center = view.getCenter();
      info.innerHTML = formatCoordinate(center);
    });

    map.on('click', function(event) {
      var feature = map.getFeaturesAtPixel(event.pixel)[0];
      if (feature) {
        var coordinate = (feature.getGeometry() as Point).getCoordinates();
        popup.setPosition(coordinate);
        console.log(formatCoordinate(coordinate));
        ($(element) as any).popover({
          placement: 'top',
          title: feature.get('label'),
          html: true,
          content: formatCoordinate(coordinate)
        });
        ($(element) as any).popover('show');
      } else {
        ($(element) as any).popover('dispose');
      }
    });

    map.on('pointermove', function(event) {
      if (map.hasFeatureAtPixel(event.pixel)) {
        map.getViewport().style.cursor = 'pointer';
      } else {
        map.getViewport().style.cursor = 'inherit';
      }
    });


    return overlay;
  }
}
