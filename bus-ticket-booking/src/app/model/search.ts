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


export interface IBooking {
  bookingId: number
  custId: number
  bookingDate: string
  scheduleId: number
  busBookingPassengers: IBusBookingPassenger[]
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



