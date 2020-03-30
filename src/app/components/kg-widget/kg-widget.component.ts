import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'kg-widget',
  templateUrl: './kg-widget.component.html',
  styleUrls: ['./kg-widget.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class KgWidgetComponent implements OnInit, AfterViewInit {

  @Input() view: string;//  = 'table';
  @Input() endpoint: string;//  = 'table';
  @Input() query: string;//  = 'table';

  constructor(private elm: ElementRef) {
  }

  ngOnInit() {
    //console.log('ngOnInit(): kgview   :', this.elm.nativeElement.getAttribute('kgview'));
  }

  ngAfterViewInit() {
    this.view = this.elm.nativeElement.getAttribute('view');
    this.endpoint = this.elm.nativeElement.getAttribute('endpoint');
    this.query = this.elm.nativeElement.getAttribute('query');
    //console.log('ngAfterViewInit(): kgview   :', this.elm.nativeElement.getAttribute('kgview'));
  }

}
