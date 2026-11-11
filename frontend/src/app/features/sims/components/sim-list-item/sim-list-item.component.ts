import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimCard } from '../../../../core/models/sim-card.model';

@Component({
  selector: 'app-sim-list-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <tr>
      <td>{{ sim.iccid }}</td>
      <td>{{ sim.imsi || '-' }}</td>
      <td>{{ sim.type }}</td>
      <td>{{ sim.status }}</td>
      <td>{{ sim.customerName || '-' }}</td>
      <td>
        <button class="btn btn-secondary" style="margin-right: 8px;" (click)="edit.emit(sim.id)">Upraviť</button>
        <button class="btn btn-danger" (click)="delete.emit(sim.id)">Zmazať</button>
      </td>
    </tr>
  `
})
export class SimListItemComponent {
  @Input() sim!: SimCard;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
}
