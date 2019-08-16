import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponentComponent implements OnInit {
  clientes:Array<Object> = [];
  title: string = 'clientes';
  lat: number = 21.928142;
  lng: number = -102.284551;

  lat1: number = 21.927226;
  lng1: number = -102.280952;

  lat2: number = 21.928142;
  lng2: number = -102.284551;

  lat3: number = 21.930449;
  lng3: number = -102.280677;

  lat4: number = 21.927597;
  lng4: number = -102.277314;

  lat5: number = 21.932366;
  lng5: number =  -102.280291;

  lat6: number = 21.931877;
  lng6: number = -102.282769;

  constructor() { }

  ngOnInit() {
  }

}
