import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SelectResults} from "../model/SelectResults";

@Injectable({
  providedIn: 'root'
})
export class SparqlService {

  constructor(private http: HttpClient) {
  }

  select(sparql: string) {
    const requestBody = "query=" + encodeURIComponent(sparql) +
      "&Accept=" + encodeURIComponent('application/sparql-results+json');
    return this.http.post<SelectResults>("https://sparql.opendatahub.bz.it/sparql", requestBody,{
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }),
    });
  }
}
