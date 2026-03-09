import { Component, inject, OnInit } from '@angular/core';
import { BusLocationsService } from '../../services/bus-locations.service';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../../model/search';

@Component({
  selector: 'app-search-result',
  imports: [],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent implements OnInit {

  searchObj: Search = {
        fromLocationId: 0,
        toLocationId: 0,
        date: ''
  };

  availableBuses: any[] = [];

  activatedRoute = inject(ActivatedRoute);

  constructor(private busLocationServices: BusLocationsService) {    
    this.activatedRoute.params.subscribe((res: any) =>{
      this.searchObj.fromLocationId = res.fromId;
      this.searchObj.toLocationId = res.toId;
      this.searchObj.date = res.date;
      this.busLocationServices.searchBus(this.searchObj).subscribe((res: any) => {
        this.availableBuses = res;
        console.log(res);
      });
    });  

  }

  ngOnInit(): void {
    // const storedData = localStorage.getItem("searchData");
    // if (storedData) {
    //   const searchObj = JSON.parse(storedData);
    //   this.busLocationServices.searchBus(searchObj).subscribe((res: any) => {
    //     this.availableBuses = res;
    //     console.log(res);
    //   });
    // }
  }




}
