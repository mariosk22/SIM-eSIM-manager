import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SimService } from '../../../core/services/sim.service';
import { SimCard } from '../../../core/models/sim-card.model';
import { SimAssignmentHistory } from '../../../core/models/sim-assignment-history.model';

@Component({
  selector: 'app-sim-history',
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="container">
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2>História vlastníctva SIM karty</h2>
          <button class="btn btn-secondary" (click)="goBack()">Späť na SIM karty</button>
        </div>

        @if (loading()) {
          <p>Načítavam históriu...</p>
        }

        @if (sim(); as currentSim) {
          <p style="margin-bottom: 16px;">
            <strong>ICCID:</strong> {{ currentSim.iccid }}
            &nbsp;|&nbsp;
            <strong>Stav:</strong> {{ currentSim.status }}
            &nbsp;|&nbsp;
            <strong>Aktuálny zákazník:</strong> {{ currentSim.customerName || '—' }}
          </p>
        }

        <table>
          <thead>
            <tr>
              <th>Zákazník</th>
              <th>Priradené</th>
              <th>Ukončené</th>
              <th>Stav záznamu</th>
              <th>Poznámka</th>
            </tr>
          </thead>
          <tbody>
            @for (item of history(); track item.id) {
              <tr>
                <td>{{ item.customerName || '—' }}</td>
                <td>{{ item.assignedAt | date: 'd.M.yyyy H:mm' }}</td>
                <td>{{ item.unassignedAt ? (item.unassignedAt | date: 'd.M.yyyy H:mm') : '—' }}</td>
                <td>{{ item.active ? 'Aktuálny vlastník' : 'Predchádzajúci vlastník' }}</td>
                <td>{{ item.note || '—' }}</td>
              </tr>
            } @empty {
              @if (!loading()) {
                <tr>
                  <td colspan="5" style="text-align: center;">Zatiaľ žiadna história priradení</td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class SimHistoryComponent implements OnInit {
  private simService = inject(SimService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  simId = 0;
  sim = signal<SimCard | null>(null);
  history = signal<SimAssignmentHistory[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.simId = +(this.route.snapshot.paramMap.get('id') ?? 0);

    this.simService.getById(this.simId).subscribe({
      next: (data) => this.sim.set(data)
    });

    this.simService.getHistory(this.simId).subscribe({
      next: (data) => {
        this.history.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  goBack() {
    this.router.navigate(['/sims']);
  }
}
