import {Directive, Input} from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({selector: 'query'})
export class QueryDirective {
  // input can be added if necessary with other parameter specific for the query
  @Input() id: number;
}
