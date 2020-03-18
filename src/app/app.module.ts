import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';

import {HttpClientModule} from '@angular/common/http';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import {FrontpageComponent} from './frontpage/frontpage.component';
import {KgTableComponent} from './components/kg-table/kg-table.component';
import {KgMapComponent} from './components/kg-map/kg-map.component';
import {KgGalleryComponent} from './components/kg-gallery/kg-gallery.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [FrontpageComponent, KgGalleryComponent, KgMapComponent, KgTableComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, BrowserAnimationsModule, MatSliderModule, MatTableModule, MatTabsModule],
  entryComponents: [KgTableComponent, KgMapComponent, KgGalleryComponent, FrontpageComponent],
  providers: [],
  bootstrap: [FrontpageComponent]
})
export class AppModule {
  constructor(private injector: Injector) {

  }

  ngDoBootstrap() {
    const elements: any[] = [
      [KgTableComponent, 'kg-table'],
      [KgGalleryComponent, 'kg-gallery'],
      [KgMapComponent, 'kg-map'],
      [FrontpageComponent, 'app-frontpage'],
    ];
    for (const [component, name] of elements) {
      const el = createCustomElement(component, { injector: this.injector});
      customElements.define(name, el);
    }
  }

}
