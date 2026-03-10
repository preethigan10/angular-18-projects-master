import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { IScheduledBus } from '../../model/search';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-ticket',
  imports: [DatePipe, FormsModule, CommonModule],
  templateUrl: './book-ticket.component.html',
  styleUrl: './book-ticket.component.css',
})
export class BookTicketComponent {
  activatedRoute = inject(ActivatedRoute);
  searchService = inject(SearchService);
  schldId: number = 0;
  scheduledBus: IScheduledBus = {    
    scheduleId: 0,
    vendorId: 0,
    busName: '',
    busVehicleNo: '',
    fromLocation: 0,
    toLocation: 0,
    departureTime: '',
    arrivalTime: '',
    scheduleDate: '',
    price: 0,
    totalSeats: 0
  };
  seatList: number[] = [];
  addedSeats: number[] = [];

  constructor() {
    this.activatedRoute.params.subscribe((res: any) => {
      this.schldId = res.scheduleId;
      this.getBusScheduleById(this.schldId);
    });
  }

  getBusScheduleById(schldId: number) {
    this.searchService
      .getBusScheduleById(schldId)
      .subscribe((res: IScheduledBus) => {
        this.scheduledBus = res;
        for (let i = 1; i <= this.scheduledBus.totalSeats; i++) {
          this.seatList.push(i);
        }
      });
  }

  addSeats(item: number) {
    if (!this.addedSeats.includes(item)){
      this.addedSeats.push(item);
    } else {      
        const index = this.addedSeats.indexOf(item);        
        this.addedSeats.splice(index, 1);
    }
  }
}
