import { Injectable, signal } from '@angular/core';
import { Alert } from '../model/interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alert = signal<Alert | null>(null);

  show(type: Alert['type'], message: string) {
    this.alert.set({ type, message });
    setTimeout(() => this.clear(), 3000);
  }

  clear() {
    this.alert.set(null);
  }
  
}
