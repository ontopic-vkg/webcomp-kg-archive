import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';

import {HttpClientModule} from "@angular/common/http";


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatTableModule} from "@angular/material/table";
import {FrontpageComponent} from './frontpage/frontpage.component';
import {KgTableComponent} from "./components/kg-table/kg-table.component";
import {KgMapComponent} from "./components/kg-map/kg-map.component";
import {KgGalleryComponent} from "./components/kg-gallery/kg-gallery.component";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [FrontpageComponent, KgGalleryComponent, KgMapComponent, KgTableComponent, FrontpageComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, BrowserAnimationsModule, MatSliderModule, MatTableModule, MatTabsModule],
  providers: [],
  entryComponents: [KgTableComponent, KgMapComponent, KgGalleryComponent, FrontpageComponent],
  bootstrap: [FrontpageComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    const el = createCustomElement(KgTableComponent, {injector});
    customElements.define('kg-table', el);

    const mapEl = createCustomElement(KgMapComponent, {injector});
    customElements.define('kg-map', mapEl);

    const galleryEl = createCustomElement(KgGalleryComponent, {injector});
    customElements.define('kg-gallery', galleryEl);

    const frontEl = createCustomElement(FrontpageComponent, {injector});
    customElements.define('app-frontpage', frontEl);
  }

  ngDoBootstrap() {
  }
}
