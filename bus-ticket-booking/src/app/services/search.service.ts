import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IScheduledBus, ISearch } from '../model/search';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  http = inject(HttpClient);
  apiUrl = 'https://api.freeprojectapi.com/api/BusBooking/';
  constructor() {}

  getAllBusLocations(): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + 'GetBusLocations',
    );
  }

  searchBus(details: ISearch): Observable<any> {
    return this.http.get<any>(
      this.apiUrl +  "searchBus2?" + "fromLocation=" + details.fromLocationId + 
      "&toLocation=" +  details.toLocationId +  "&travelDate=" + details.date
    );
  }

  getBusScheduleById(schldId: number): Observable<IScheduledBus>{
    return this.http.get<IScheduledBus>(`${this.apiUrl}GetBusScheduleById?id=${schldId}`);
  }
}
