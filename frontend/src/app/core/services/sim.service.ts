import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimCard, SimCardRequest } from '../models/sim-card.model';

@Injectable({
  providedIn: 'root'
})
export class SimService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/sims';

  getAll(): Observable<SimCard[]> {
    return this.http.get<SimCard[]>(this.apiUrl);
  }

  getById(id: number): Observable<SimCard> {
    return this.http.get<SimCard>(`${this.apiUrl}/${id}`);
  }

  create(request: SimCardRequest): Observable<SimCard> {
    return this.http.post<SimCard>(this.apiUrl, request);
  }

  update(id: number, request: SimCardRequest): Observable<SimCard> {
    return this.http.put<SimCard>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
