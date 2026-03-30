import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ISearch } from '../../model/search';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{


  locationList: any[] = [];

  searchObj: ISearch = {
      fromLocationId: 0,
      toLocationId: 0,
      date: ''
  };

  searchService = inject(SearchService);
  router = inject(Router);

  constructor(){
  }

  ngOnInit(): void {
    this.getBusLocations();
  }

  getBusLocations () {    
    this.searchService.getAllBusLocations().subscribe((res: any) => {
      this.locationList = res;
    });
  }

  searchBus(){
    this.router.navigate(['/search-result', this.searchObj.fromLocationId, this.searchObj.toLocationId, this.searchObj.date]);
  }

  
}
