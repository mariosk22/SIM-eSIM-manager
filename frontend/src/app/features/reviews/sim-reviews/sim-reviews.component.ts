import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormField, form, required, minLength, maxLength } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { SimService } from '../../../core/services/sim.service';
import { ReviewService } from '../../../core/services/review.service';
import { SimCard } from '../../../core/models/sim-card.model';
import { PhoneReview, PhoneReviewRequest } from '../../../core/models/phone-review.model';

interface ReviewFormModel {
  rating: '' | '1' | '2' | '3' | '4' | '5';
  comment: string;
}

@Component({
  selector: 'app-sim-reviews',
  imports: [DatePipe, FormField],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="container">
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2>Recenzie telefónneho čísla</h2>
          <button class="btn btn-secondary" (click)="goBack()">Späť na SIM karty</button>
        </div>

        @if (sim(); as currentSim) {
          <p style="margin-bottom: 20px;">
            <strong>ICCID:</strong> {{ currentSim.iccid }}
            &nbsp;|&nbsp;
            <strong>Aktuálny zákazník:</strong> {{ currentSim.customerName || '—' }}
          </p>
        }

        <h3 style="margin-bottom: 12px;">Pridať recenziu</h3>
        <form (submit)="onSubmit($event)" style="max-width: 600px; margin-bottom: 24px;">
          <div class="form-group">
            <label for="rating">Hodnotenie *</label>
            <select id="rating" [formField]="reviewForm.rating">
              <option value="">Vyber hodnotenie</option>
              <option value="1">1 - najhoršie</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5 - najlepšie</option>
            </select>
            @if (reviewForm.rating().touched() && reviewForm.rating().invalid()) {
              <div class="error-text">Vyber hodnotenie od 1 do 5</div>
            }
          </div>

          <div class="form-group">
            <label for="comment">Text recenzie *</label>
            <textarea id="comment" rows="4" [formField]="reviewForm.comment"></textarea>
            @if (reviewForm.comment().touched() && reviewForm.comment().invalid()) {
              <div class="error-text">Text recenzie je povinný (min. 3 znaky, max. 1000 znakov)</div>
            }
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="reviewForm().invalid() || saving()">
            {{ saving() ? 'Ukladám...' : 'Uložiť recenziu' }}
          </button>
        </form>

        <h3 style="margin-bottom: 12px;">Existujúce recenzie</h3>
        @if (reviewsLoading()) {
          <p>Načítavam recenzie...</p>
        }

        <table>
          <thead>
            <tr>
              <th>Autor</th>
              <th>Hodnotenie</th>
              <th>Text recenzie</th>
              <th>Vytvorená</th>
            </tr>
          </thead>
          <tbody>
            @for (review of reviews(); track review.id) {
              <tr>
                <td>{{ review.author }}</td>
                <td>{{ review.rating }} / 5</td>
                <td>{{ review.comment }}</td>
                <td>{{ review.createdAt | date: 'd.M.yyyy H:mm' }}</td>
              </tr>
            } @empty {
              @if (!reviewsLoading()) {
                <tr>
                  <td colspan="4" style="text-align: center;">Zatiaľ žiadne recenzie tohto čísla</td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class SimReviewsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private simService = inject(SimService);
  private reviewService = inject(ReviewService);

  simId = 0;
  sim = signal<SimCard | null>(null);
  reviews = signal<PhoneReview[]>([]);
  reviewsLoading = signal(true);
  saving = signal(false);

  readonly reviewModel = signal<ReviewFormModel>({
    rating: '',
    comment: ''
  });

  readonly reviewForm = form(this.reviewModel, (path) => {
    required(path.rating);
    required(path.comment);
    minLength(path.comment, 3);
    maxLength(path.comment, 1000);
  });

  ngOnInit() {
    this.simId = +(this.route.snapshot.paramMap.get('id') ?? 0);

    this.simService.getById(this.simId).subscribe({
      next: (data) => this.sim.set(data)
    });

    this.loadReviews();
  }

  loadReviews() {
    this.reviewsLoading.set(true);
    this.reviewService.getBySim(this.simId).subscribe({
      next: (data) => {
        this.reviews.set(data);
        this.reviewsLoading.set(false);
      },
      error: () => this.reviewsLoading.set(false)
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.reviewForm().invalid()) {
      this.reviewForm().markAsTouched();
      return;
    }

    const value = this.reviewForm().value();
    const request: PhoneReviewRequest = {
      rating: Number(value.rating),
      comment: value.comment.trim()
    };

    this.saving.set(true);
    this.reviewService.create(this.simId, request).subscribe({
      next: () => {
        this.saving.set(false);
        this.reviewForm().reset({ rating: '', comment: '' });
        this.loadReviews();
      },
      error: () => this.saving.set(false)
    });
  }

  goBack() {
    this.router.navigate(['/sims']);
  }
}
