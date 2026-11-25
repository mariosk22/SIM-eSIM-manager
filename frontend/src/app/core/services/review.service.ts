import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhoneReview, PhoneReviewRequest } from '../models/phone-review.model';
import { API_BASE_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private http = inject(HttpClient);
  private apiUrl = `${API_BASE_URL}/api`;

  getAll(): Observable<PhoneReview[]> {
    return this.http.get<PhoneReview[]>(`${this.apiUrl}/reviews`);
  }

  getBySim(simId: number): Observable<PhoneReview[]> {
    return this.http.get<PhoneReview[]>(`${this.apiUrl}/sims/${simId}/reviews`);
  }

  create(simId: number, request: PhoneReviewRequest): Observable<PhoneReview> {
    return this.http.post<PhoneReview>(`${this.apiUrl}/sims/${simId}/reviews`, request);
  }
}
