import { Component, Input } from '@angular/core';
import {SparqlService} from "../sparql.service";
import {Observable} from "rxjs";
import {SelectResults} from "../../model/SelectResults";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'kg-table',
  templateUrl: './kg-table.component.html',
  styleUrls: ['./kg-table.component.css']
})
export class KgTableComponent {
  @Input() signupTitle = 'Sign up for our newsletter';
  @Input() thankyouMessage = 'Thanks!';
  results: SelectResults;

  formData = { name: '', email: '', query: 'PREFIX schema: <http://schema.org/>\n' +
      'PREFIX geo: <http://www.opengis.net/ont/geosparql#>\n' +
      '\n' +
      'SELECT ?h ?pos ?posLabel ?posColor\n' +
      'WHERE {\n' +
      '  ?h a schema:LodgingBusiness ;\n' +
      '     geo:asWKT ?pos ;\n' +
      '     schema:name ?posLabel ;\n' +
      '     schema:address ?a .\n' +
      '  # ?a schema:postalCode "39100" . # Uncomment for Bolzano only\n' +
      '  FILTER (lang(?posLabel) = \'de\')\n' +
      '\n' +
      '  # Colors\n' +
      '  OPTIONAL {\n' +
      '    ?h a schema:Campground .\n' +
      '    BIND("chlorophyll,0.5" AS ?posColor) # Green\n' +
      '  }\n' +
      '    OPTIONAL {\n' +
      '    ?h a schema:BedAndBreakfast .\n' +
      '    BIND("viridis,0.1" AS ?posColor) # Purple\n' +
      '  }\n' +
      '  OPTIONAL {\n' +
      '    ?h a schema:Hotel .\n' +
      '    BIND("jet,0.3" AS ?posColor) # Light blue\n' +
      '  }\n' +
      '  OPTIONAL {\n' +
      '    ?h a schema:Hostel .\n' +
      '    BIND("jet,0.8" AS ?posColor) # Red\n' +
      '  }\n' +
      '}\n' +
      'LIMIT 500\n' };

  formSubmitted = false;

  constructor(private sparqlService: SparqlService) { }

  onSubmit() {
    const results: Observable<SelectResults> = this.sparqlService.select(this.formData.query);
    results.subscribe(value => {
      this.results = value;
      this.thankyouMessage = JSON.stringify(value);
      this.formSubmitted = true;
    }, error => {
      this.thankyouMessage = JSON.stringify(error);
      this.formSubmitted = true;
    });

  }

}
