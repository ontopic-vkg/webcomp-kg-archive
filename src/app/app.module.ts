import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';

import {HttpClientModule} from "@angular/common/http";

import {KgTableComponent} from './kg-table/kg-table.component';

@NgModule({
  declarations: [KgTableComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  entryComponents: [KgTableComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    const el = createCustomElement(KgTableComponent, {injector});
    customElements.define('kg-table', el);
  }

  ngDoBootstrap() {
  }
}
