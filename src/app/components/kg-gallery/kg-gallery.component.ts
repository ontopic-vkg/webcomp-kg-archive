import {AfterContentInit, Component, ContentChild, ElementRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SelectResultSet} from '../../../model/sparql';
import {SparqlService} from '../../sparql.service';
import {QueryDirective} from '../../shared/query.directive';

@Component({
  selector: 'kg-gallery',
  templateUrl: './kg-gallery.component.html',
  styleUrls: ['./kg-gallery.component.css'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class KgGalleryComponent implements OnInit {
  @Input() endpoint: string;

  @Input() errorMessage = '';

  results: SelectResultSet;

  finished = false;

  @ContentChild(QueryDirective, { read: ElementRef, static: true}) queryInput: ElementRef;

  constructor(private sparqlService: SparqlService) { }

  ngOnInit() {
    this.sparqlService.endpoint = this.endpoint;
    if (this.queryInput) {
      this.sparqlService.select(this.queryInput.nativeElement.innerText)
        .subscribe(value => {
          this.finished = true;
          this.results = value;
        }, error => {
          this.finished = true;
          this.errorMessage = JSON.stringify(error);
        });
    } else {
      this.finished = true;
    }

  }

}
