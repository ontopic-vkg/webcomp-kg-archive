import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SelectResults, SolutionMapping} from "../model/SelectResults";

import WKT from 'ol/format/WKT';
import {Feature} from "ol";
import {Observable} from "rxjs";


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

  select(sparql: string): Observable<SelectResults> {
    const requestBody = "query=" + encodeURIComponent(sparql) +
      "&Accept=" + encodeURIComponent('application/sparql-results+json');
    console.log(requestBody);
    return this.http.post<SelectResults>(this._endpoint, requestBody, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }),
    });
  }

  asFeatures(results: SelectResults): Feature[] {
    const wktVar = "pos";
    const labelVar = "posLabel";
    const wktFormat = new WKT();

    return results.results.bindings
      .map((m: SolutionMapping) => {
        const wkt: string = m[wktVar].value;
        const feature: Feature = wktFormat.readFeature(wkt);
        if (m[labelVar])
          feature.set("label", m[labelVar].value);
        return feature;
      });
  }

}
