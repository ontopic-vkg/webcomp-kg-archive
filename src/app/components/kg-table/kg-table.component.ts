import {AfterContentInit, Component, ContentChild, ElementRef, Input, OnInit} from '@angular/core';
import {SparqlService} from '../../sparql.service';
import {SelectResultSet} from '../../../model/sparql';
import {Observable} from 'rxjs';
import {QueryDirective} from '../../shared/query.directive';


@Component({
  selector: 'kg-table',
  templateUrl: './kg-table.component.html',
  styleUrls: ['./kg-table.component.css']
})
export class KgTableComponent implements OnInit {

  @Input() endpoint: string;

  @Input() errorMessage = '';

  results: SelectResultSet;

  finished = false;

  // @ContentChild gives first element matching the selector from the content DOM.
  // Contents queried by @ContentChild are set before ngAfterContentInit() is called.
  // { static: true } needs to be set when you want to access the ContentChild in ngOnInit.
  @ContentChild(QueryDirective, { read: ElementRef, static: true}) queryInput: ElementRef;

  constructor(private sparqlService: SparqlService) {}

  ngOnInit(): void {

    this.sparqlService.endpoint = this.endpoint;
    if (this.queryInput) {
      const results: Observable<SelectResultSet> = this.sparqlService.select(this.queryInput.nativeElement.innerText);
      results.subscribe(value => {
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
