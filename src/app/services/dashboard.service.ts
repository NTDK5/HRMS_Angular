import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'api';  // Using the in-memory-web-api base URL

  constructor(private http: HttpClient) { }

  getCounts(): Observable<any> {
    return forkJoin({
      employees: this.http.get<any[]>(`${this.apiUrl}/employees`).pipe(map(data => data.length)),
      departments: this.http.get<any[]>(`${this.apiUrl}/departments`).pipe(map(data => data.length)),
      companies: this.http.get<any[]>(`${this.apiUrl}/companies`).pipe(map(data => data.length)),
      candidates: this.http.get<any[]>(`${this.apiUrl}/candidates`).pipe(map(data => data.length)),
      salaries: this.http.get<any[]>(`${this.apiUrl}/salaries`).pipe(map(data => data.length))
    });
  }
} 