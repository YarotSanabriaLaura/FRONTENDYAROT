import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estufa } from '../models/estufa';

@Injectable({
  providedIn: 'root'
})
export class EstufaService {

  private apiUrl = 'http://localhost:8080/api/estufas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Estufa[]> {
    return this.http.get<Estufa[]>(this.apiUrl);
  }

  getById(id: number): Observable<Estufa> {
    return this.http.get<Estufa>(`${this.apiUrl}/${id}`);
  }



  create(estufa: Estufa): Observable<Estufa> {
    return this.http.post<Estufa>(this.apiUrl, estufa);
  }

  update(id: number, estufa: Estufa): Observable<Estufa> {
    return this.http.put<Estufa>(`${this.apiUrl}/${id}`, estufa);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getByCocina(cocinaId: number): Observable<Estufa[]> {
  return this.http.get<Estufa[]>(`${this.apiUrl}/cocina/${cocinaId}`);
}



}
