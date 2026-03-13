import { inject, Injectable } from '@angular/core';
import { API_URL } from '../core/constants/constants';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  http = inject(HttpClient);

  constructor() { }

  getProducts(): Observable<any> {
    return this.http.get(API_URL + 'products');
  }


}
