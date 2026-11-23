import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormField, form, required, minLength, maxLength } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { SimService } from '../../../core/services/sim.service';
import { CustomerService } from '../../../core/services/customer.service';
import { SimCardRequest, SimStatus, SimType } from '../../../core/models/sim-card.model';
import { Customer } from '../../../core/models/customer.model';

interface SimFormModel {
  iccid: string;
  imsi: string;
  type: '' | SimType;
  status: SimStatus;
  customerId: string;
  note: string;
}

@Component({
  selector: 'app-sim-form',
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="container">
      <div class="card" style="max-width: 600px; margin: 20px auto;">
        <h2 style="margin-bottom: 20px;">{{ isEditMode ? 'Upraviť SIM kartu' : 'Pridať SIM kartu' }}</h2>

        <form (submit)="onSubmit($event)">
          <div class="form-group">
            <label for="iccid">ICCID *</label>
            <input id="iccid" type="text" [formField]="simForm.iccid">
            @if (simForm.iccid().touched() && simForm.iccid().invalid()) {
              <div class="error-text">ICCID je povinné (min. 19 znakov)</div>
            }
          </div>

          <div class="form-group">
            <label for="imsi">IMSI</label>
            <input id="imsi" type="text" [formField]="simForm.imsi">
          </div>

          <div class="form-group">
            <label for="type">Typ *</label>
            <select id="type" [formField]="simForm.type">
              <option value="">Vyber typ</option>
              <option value="PHYSICAL">PHYSICAL</option>
              <option value="ESIM">ESIM</option>
            </select>
            @if (simForm.type().touched() && simForm.type().invalid()) {
              <div class="error-text">Typ SIM karty je povinný</div>
            }
          </div>

          <div class="form-group">
            <label for="status">Stav</label>
            <select id="status" [formField]="simForm.status">
              <option value="IN_STOCK">IN_STOCK</option>
              <option value="RESERVED">RESERVED</option>
              <option value="ASSIGNED">ASSIGNED</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="SUSPENDED">SUSPENDED</option>
              <option value="TERMINATED">TERMINATED</option>
            </select>
          </div>

          <div class="form-group">
            <label for="customerId">Zákazník</label>
            <select id="customerId" [formField]="simForm.customerId">
              <option value="">Žiadny</option>
              @for (customer of customers; track customer.id) {
                <option [value]="customer.id">{{ customer.firstName }} {{ customer.lastName }}</option>
              }
            </select>
          </div>

          <div class="form-group">
            <label for="note">Poznámka</label>
            <input id="note" type="text" [formField]="simForm.note">
          </div>

          <button type="submit" class="btn btn-primary" style="margin-right: 10px;" [disabled]="simForm().invalid()">Uložiť</button>
          <button type="button" class="btn btn-secondary" (click)="cancel()">Zrušiť</button>
        </form>
      </div>
    </div>
  `
})
export class SimFormComponent implements OnInit {
  private simService = inject(SimService);
  private customerService = inject(CustomerService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = false;
  simId?: number;
  customers: Customer[] = [];

  readonly simModel = signal<SimFormModel>({
    iccid: '',
    imsi: '',
    type: '',
    status: 'IN_STOCK',
    customerId: '',
    note: ''
  });

  readonly simForm = form(this.simModel, (path) => {
    required(path.iccid);
    minLength(path.iccid, 19);
    maxLength(path.iccid, 22);
    required(path.type);
  });

  ngOnInit() {
    this.loadCustomers();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.simId = +id;
      this.loadSim(this.simId);
    }
  }

  loadCustomers() {
    this.customerService.getAll().subscribe({
      next: (data) => (this.customers = data)
    });
  }

  loadSim(id: number) {
    this.simService.getById(id).subscribe({
      next: (sim) => {
        this.simModel.set({
          iccid: sim.iccid,
          imsi: sim.imsi || '',
          type: sim.type,
          status: sim.status,
          customerId: sim.customerId != null ? String(sim.customerId) : '',
          note: sim.note || ''
        });
      }
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.simForm().invalid()) {
      this.simForm().markAsTouched();
      return;
    }

    const value = this.simForm().value();
    const request: SimCardRequest = {
      iccid: value.iccid,
      imsi: value.imsi || undefined,
      type: value.type as SimType,
      status: value.status,
      note: value.note || undefined,
      ...(value.customerId ? { customerId: +value.customerId } : {})
    };

    if (this.isEditMode && this.simId) {
      this.simService.update(this.simId, request).subscribe({
        next: () => this.router.navigate(['/sims'])
      });
    } else {
      this.simService.create(request).subscribe({
        next: () => this.router.navigate(['/sims'])
      });
    }
  }

  cancel() {
    this.router.navigate(['/sims']);
  }
}
