import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { BusLocationsService } from '../../services/bus-locations.service';
import { Search } from '../../model/search';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{


  locationList: any[] = [];

  searchObj: Search = {
      fromLocationId: 0,
      toLocationId: 0,
      date: ''
  };

  constructor(private busLocationServices: BusLocationsService, private router: Router){

  }

  ngOnInit(): void {
    this.getBusLocations();
  }

  getBusLocations () {    
    this.busLocationServices.getAllBusLocations().subscribe((res: any) => {
      this.locationList = res;
    });
  }

  searchBus(){
    this.router.navigate(['/search-result', this.searchObj.fromLocationId, this.searchObj.toLocationId, this.searchObj.date]);
    // localStorage.setItem("searchData", JSON.stringify(this.searchObj));
  }

  
}
