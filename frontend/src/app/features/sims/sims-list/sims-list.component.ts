import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SimService } from '../../../core/services/sim.service';
import { SimCard } from '../../../core/models/sim-card.model';
import { SimListItemComponent } from '../components/sim-list-item/sim-list-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sims-list',
  standalone: true,
  imports: [CommonModule, RouterLink, SimListItemComponent],
  template: `
    <div class="container">
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2>SIM karty</h2>
          <a routerLink="/sims/add" class="btn btn-primary">Pridať SIM kartu</a>
        </div>

        <table>
          <thead>
            <tr>
              <th>ICCID</th>
              <th>IMSI</th>
              <th>Typ</th>
              <th>Stav</th>
              <th>Zákazník</th>
              <th>Akcie</th>
            </tr>
          </thead>
          <tbody>
            @for (sim of sims; track sim.id) {
              <tr app-sim-list-item [sim]="sim" (edit)="onEdit($event)" (delete)="onDelete($event)"></tr>
            }
            @if (sims.length === 0) {
              <tr>
                <td colspan="6" style="text-align: center;">Žiadne SIM karty</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class SimsListComponent implements OnInit {
  private simService = inject(SimService);
  private router = inject(Router);
  sims: SimCard[] = [];

  ngOnInit() {
    this.loadSims();
  }

  loadSims() {
    this.simService.getAll().subscribe({
      next: (data) => {
        this.sims = data;
      }
    });
  }

  onEdit(id: number) {
    this.router.navigate(['/sims/edit', id]);
  }

  onDelete(id: number) {
    if (confirm('Naozaj chceš zmazať túto SIM kartu?')) {
      this.simService.delete(id).subscribe({
        next: () => {
          this.loadSims();
        }
      });
    }
  }
}
