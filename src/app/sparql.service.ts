import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SelectResults} from "../model/SelectResults";

@Injectable({
  providedIn: 'root'
})
export class SparqlService {
  get endpoint(): string {
    return this._endpoint;
  }

  set endpoint(value: string) {
    this._endpoint = value;
  }

  private _endpoint; // = "https://sparql.opendatahub.bz.it/sparql";

  constructor(private http: HttpClient) {
  }

  select(sparql: string) {
    const requestBody = "query=" + encodeURIComponent(sparql) +
      "&Accept=" + encodeURIComponent('application/sparql-results+json');
    console.log(requestBody);
    return this.http.post<SelectResults>(this._endpoint, requestBody, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }),
    });
  }
}
