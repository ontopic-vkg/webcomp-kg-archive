import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {SparqlService} from "../sparql.service";
import {Observable} from "rxjs";
import {SelectResults} from "../../model/SelectResults";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'kg-table',
  templateUrl: './kg-table.component.html',
  styleUrls: ['./kg-table.component.css']
})
export class KgTableComponent implements OnInit {

  @Input() endpoint: string;

  @Input() signupTitle = 'Sign up for our newsletter';
  @Input() errorMessage = '';

  @Input() query: string;

  results: SelectResults;

  formSubmitted = false;
  finished: boolean = false;

  constructor(private sparqlService: SparqlService, private el: ElementRef) {

  }

  ngOnInit(): void {

    this.sparqlService.endpoint = this.endpoint;

    // let myCurrentContent:string = this.el.nativeElement.innerHTML;
    // console.log(myCurrentContent)

    const results: Observable<SelectResults> = this.sparqlService.select(this.query);
    results.subscribe(value => {
      this.finished = true;
      this.results = value;
    }, error => {
      this.finished = true;
      this.errorMessage = JSON.stringify(error);
    });

  }

}
