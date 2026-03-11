import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { IBooking, IBusBookingPassenger, IScheduledBus } from '../../model/search';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnyARecord } from 'dns';
import { escape } from 'querystring';

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
    totalSeats: 0,
  };
  seatList: number[] = [];
  seatSelectedArray: IBusBookingPassenger[] = [];
  bookingObj: IBooking = new IBooking();
  bookedSeats: number[]= [];

  constructor() {
    this.activatedRoute.params.subscribe((res: any) => {
      this.schldId = res.scheduleId;
      this.bookingObj.scheduleId = this.schldId;
      this.bookingObj.bookingId = 1310;
      this.bookingObj.bookingDate = new Date();
      this.getAllBookedSeats(this.schldId);
      this.getBusScheduleById(this.schldId);
    });
  }

   getAllBookedSeats(schldId: number){
    this.searchService.getAllBookedSeats(schldId).subscribe((res: any)=>{
      this.bookedSeats = res;
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

  addSeats(seat: number) {
    if (!this.seatSelectedArray.some(obj => obj.seatNo === seat)) {
      const newPassengerData: IBusBookingPassenger = {
        passengerId: 0,
        bookingId: 0,
        passengerName: '',
        age: 0,
        gender: '',
        seatNo: seat,
      };
      this.seatSelectedArray.push(newPassengerData);
    } else {
      const index = this.seatSelectedArray.findIndex(item => item.seatNo);
      if (index !== -1) {this.seatSelectedArray.splice(index, 1);}
    }
  }

  findSelected(item: number){
    return {
      'available selected': this.seatSelectedArray.some(obj => obj.seatNo === item),
      'booked': this.bookedSeats.includes(item),
      'available': !this.bookedSeats.includes(item)
    }
  }

  bookticket() {  
    this.bookingObj.custId = 13420;
    this.bookingObj.busBookingPassengers = this.seatSelectedArray; 
    debugger;
    this.searchService.postBusBooking(this.bookingObj).subscribe((res: any) => {
      console.log(res);
      alert('Booked Successsfully');
    });
  }
}
