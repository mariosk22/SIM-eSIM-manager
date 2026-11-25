import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReviewService } from '../../../core/services/review.service';
import { PhoneReview } from '../../../core/models/phone-review.model';

@Component({
  selector: 'app-reviews-list',
  imports: [DatePipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="container">
      <div class="card">
        <h2 style="margin-bottom: 20px;">Recenzie telefónnych čísel</h2>

        @if (loading()) {
          <p>Načítavam recenzie...</p>
        }

        <table>
          <thead>
            <tr>
              <th>SIM / číslo</th>
              <th>Autor</th>
              <th>Hodnotenie</th>
              <th>Text recenzie</th>
              <th>Vytvorená</th>
              <th>Akcie</th>
            </tr>
          </thead>
          <tbody>
            @for (review of reviews(); track review.id) {
              <tr>
                <td>{{ review.iccid }}</td>
                <td>{{ review.author }}</td>
                <td>{{ review.rating }} / 5</td>
                <td>{{ review.comment }}</td>
                <td>{{ review.createdAt | date: 'd.M.yyyy H:mm' }}</td>
                <td>
                  <a [routerLink]="['/sims', review.simCardId, 'reviews']" class="btn btn-secondary">Recenzie SIM</a>
                </td>
              </tr>
            } @empty {
              @if (!loading()) {
                <tr>
                  <td colspan="6" style="text-align: center;">Zatiaľ žiadne recenzie</td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ReviewsListComponent implements OnInit {
  private reviewService = inject(ReviewService);

  reviews = signal<PhoneReview[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.reviewService.getAll().subscribe({
      next: (data) => {
        this.reviews.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
