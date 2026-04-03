import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/interface';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../core/constants/constants';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  http = inject(HttpClient);
  alertService = inject(AlertService);
  userSignal = signal<any>(null);
  route = inject(Router);
  isAuthenticated = false;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // login data stored in localstorage
  login(user: User): void {
    this.http.get(API_URL + 'user').subscribe({
      next: (res: any) => {
        const currentUser = res.filter(
          (item: User) => item.email == user.email,
        )[0];
        this.currentUserSubject.next(currentUser);
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.userSignal.set(currentUser || null);
        }
        if (currentUser.role == 'vendor') {
          this.isAuthenticated = true;
          this.route.navigateByUrl('/vendor');
        } else {
          this.isAuthenticated = false;
        }
      },
      error: (err: any) => {
        if (err.status === 401) {
          this.alertService.show('danger', 'Invalid credentials');
        } else {
          this.alertService.show('danger', 'Server error');
        }
      },
    });
  }

  // logout and clear localstorage values
  logout(): void {
    this.currentUserSubject.next(null);
    this.userSignal.set(null);
    this.isAuthenticated = false;
    localStorage.removeItem('currentUser');
    // this.route.navigateByUrl('/');
  }

  addNewUser(user: User) {
    this.http.get(API_URL + 'user').subscribe((allUsers: any) => {
      user.id = allUsers.length + 1;
      this.http.post(API_URL + 'user', user).subscribe((response) => {
        console.log('User added:', response);
      });
    });
  }

  validateUser(email: string, password: string): Observable<User> {
    return this.http.get<User>(API_URL + `user?email=${email}`);
  }

  getAllUsers() {
      return this.http.get<User[]>(API_URL + `user`);
  }
}
