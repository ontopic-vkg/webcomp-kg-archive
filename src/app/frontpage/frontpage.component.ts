import { Component, OnInit } from '@angular/core';

import {HttpClientModule} from "@angular/common/http";

import {KgTableComponent} from '../components/kg-table/kg-table.component';
import {KgMapComponent} from '../components/kg-map/kg-map.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatTableModule} from "@angular/material/table";
import {KgGalleryComponent} from '../components/kg-gallery/kg-gallery.component';


@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
