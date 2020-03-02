import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';

import {HttpClientModule} from "@angular/common/http";

import {KgTableComponent} from './kg-table/kg-table.component';
import { KgMapComponent } from './kg-map/kg-map.component';

@NgModule({
  declarations: [KgTableComponent, KgMapComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  entryComponents: [KgTableComponent, KgMapComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    const el = createCustomElement(KgTableComponent, {injector});
    customElements.define('kg-table', el);

    const mapEl = createCustomElement(KgMapComponent, {injector});
    customElements.define('kg-map', mapEl);
  }

  ngDoBootstrap() {
  }
}
