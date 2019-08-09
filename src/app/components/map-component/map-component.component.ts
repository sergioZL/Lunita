import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponentComponent implements OnInit {
  title: string = 'Rutas';
  lat: number = 21.839156;
  lng: number =-102.353242;

  constructor() { }

  ngOnInit() {
  }

}
