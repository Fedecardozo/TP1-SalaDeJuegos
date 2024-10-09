import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pais } from '../../models/pais';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = 'https://restcountries.com/v3.1/all';
  http = inject(HttpClient);

  constructor() {}

  getPaises() {
    return this.http.get(this.url);
  }
}
