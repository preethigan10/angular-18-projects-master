import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ISearchBus, ISearch } from '../../model/search';
import { SearchService } from '../../services/search.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-result',
  imports: [DatePipe, RouterLink],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent implements OnInit {

  searchObj: ISearch = {
        fromLocationId: 0,
        toLocationId: 0,
        date: ''
  };

  availableBuses: ISearchBus[] = [];

  activatedRoute = inject(ActivatedRoute);
  searchService = inject(SearchService);
  router = inject(Router);

  constructor() {    
    this.activatedRoute.params.subscribe((res: any) =>{
      this.searchObj.fromLocationId = res.fromId;
      this.searchObj.toLocationId = res.toId;
      this.searchObj.date = res.date;
      this.getBuses();
    });  

  }

  getBuses(){
    this.searchService.searchBus(this.searchObj).subscribe((res: any) => {
      this.availableBuses = res;
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

  // goToBooking(schId: number){
  //   this.router.navigate(['/book-ticket', schId]);    
  // }

  




}
