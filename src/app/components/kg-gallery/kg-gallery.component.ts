import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SelectResultSet} from "../../../model/sparql";
import {SparqlService} from "../../sparql.service";

@Component({
  selector: 'kg-gallery',
  templateUrl: './kg-gallery.component.html',
  styleUrls: ['./kg-gallery.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class KgGalleryComponent implements OnInit {
  @Input() endpoint: string;

  @Input() errorMessage = '';

  @Input() query: string;

  results: SelectResultSet;

  finished: boolean = false;

  constructor(private sparqlService: SparqlService) { }

  ngOnInit() {
    this.sparqlService.endpoint = this.endpoint;
    this.sparqlService.select(this.query)
      .subscribe(value => {
        this.finished = true;
        this.results = value;
      }, error => {
        this.finished = true;
        this.errorMessage = JSON.stringify(error);
      });

  }

}
