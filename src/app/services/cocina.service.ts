import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cocina } from '../models/cocina';

@Injectable({
  providedIn: 'root'
})
export class CocinaService {

  private apiUrl = 'http://localhost:8080/api/cocinas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cocina[]> {
    return this.http.get<Cocina[]>(this.apiUrl);
  }

  getById(id: number): Observable<Cocina> {
    return this.http.get<Cocina>(`${this.apiUrl}/${id}`);
  }

  create(cocina: Cocina): Observable<Cocina> {
    return this.http.post<Cocina>(this.apiUrl, cocina);
  }

  update(id: number, cocina: Cocina): Observable<Cocina> {
    return this.http.put<Cocina>(`${this.apiUrl}/${id}`, cocina);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
