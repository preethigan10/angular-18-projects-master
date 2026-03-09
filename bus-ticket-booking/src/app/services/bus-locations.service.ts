import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../model/search';

@Injectable({
  providedIn: 'root',
})
export class BusLocationsService {
  http = inject(HttpClient);
  constructor() {}

  getAllBusLocations(): Observable<any> {
    return this.http.get<any>(
      'https://api.freeprojectapi.com/api/BusBooking/GetBusLocations',
    );
  }

  searchBus(details: Search): Observable<any> {
    return this.http.get<any>(
      "https://api.freeprojectapi.com/api/BusBooking/searchBus2?" + "fromLocation=" + details.fromLocationId + 
      "&toLocation=" +  details.toLocationId +  "&travelDate=" + details.date
    );
  }
}
