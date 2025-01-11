import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'http://localhost:5289/api/cars';  // Replace with your API URL

  constructor(private http: HttpClient) {}

  getCars(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addCar(car: any): Observable<any> {
    return this.http.post(this.apiUrl, car);
  }

  updateCar(car: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${car.id}`, car);
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
