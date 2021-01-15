import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'angular-component-library';
  queryParam = '';
  url = '';
  testFormGroup: FormGroup = new FormGroup({ country: new FormControl('') });
  countries: Array<string> = [];

  constructor() {}


  getFilteredSuggestions(filteredDataLst: Array<any>) {
    this.countries = [...filteredDataLst];
  }

  ngOnInit() {
    this.countries = ['United States', 'United Kingdom', 'China', 'Japan', 'India', 'Russia', 'Canada', 'Brazil'];
  }



}
