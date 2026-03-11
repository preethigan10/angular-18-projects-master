export interface ISearch {
    fromLocationId: number;
    toLocationId: number;
    date?: string;
}


export interface ISearchBus {
  availableSeats: number
  totalSeats: number
  price: number
  arrivalTime: string
  scheduleId: number
  departureTime: string
  busName: string
  busVehicleNo: string
  fromLocationName: string
  toLocationName: string
  vendorName: string
  scheduleDate: string
  vendorId: number
}

export interface IScheduledBus {
  scheduleId: number
  vendorId: number
  busName: string
  busVehicleNo: string
  fromLocation: number
  toLocation: number
  departureTime: string
  arrivalTime: string
  scheduleDate: string
  price: number
  totalSeats: number
}


export class IBooking {
  bookingId: number;
  custId: number;
  bookingDate: Date;
  scheduleId: number;
  busBookingPassengers: IBusBookingPassenger[];
  constructor() {
    this.bookingId= 0;
    this.custId= 0;
    this.bookingDate= new Date();
    this.scheduleId= 0;
    this.busBookingPassengers= [];
  }
}

export class IBusBookingPassenger {
  passengerId: number;
  bookingId: number;
  passengerName: string;
  age: number;
  gender: string;
  seatNo: number;

  constructor() {
    this.passengerId = 0;
    this.bookingId = 0;
    this.passengerName = '';
    this.age = 0;
    this.gender = '';
    this.seatNo = 0;
  }
}



