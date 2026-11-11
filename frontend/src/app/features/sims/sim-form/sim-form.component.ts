import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SimService } from '../../../core/services/sim.service';
import { CustomerService } from '../../../core/services/customer.service';
import { SimCardRequest } from '../../../core/models/sim-card.model';
import { Customer } from '../../../core/models/customer.model';

@Component({
  selector: 'app-sim-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <div class="card" style="max-width: 600px; margin: 20px auto;">
        <h2 style="margin-bottom: 20px;">{{ isEditMode ? 'Upraviť SIM kartu' : 'Pridať SIM kartu' }}</h2>

        <form [formGroup]="simForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="iccid">ICCID *</label>
            <input id="iccid" type="text" formControlName="iccid">
            @if (simForm.get('iccid')?.invalid && simForm.get('iccid')?.touched) {
              <div class="error-text">ICCID je povinné (min. 19 znakov)</div>
            }
          </div>

          <div class="form-group">
            <label for="imsi">IMSI</label>
            <input id="imsi" type="text" formControlName="imsi">
          </div>

          <div class="form-group">
            <label for="type">Typ *</label>
            <select id="type" formControlName="type">
              <option value="">Vyber typ</option>
              <option value="PHYSICAL">PHYSICAL</option>
              <option value="ESIM">ESIM</option>
            </select>
            @if (simForm.get('type')?.invalid && simForm.get('type')?.touched) {
              <div class="error-text">Typ SIM karty je povinný</div>
            }
          </div>

          <div class="form-group">
            <label for="status">Stav</label>
            <select id="status" formControlName="status">
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
            <select id="customerId" formControlName="customerId">
              <option [ngValue]="null">Žiadny</option>
              @for (customer of customers; track customer.id) {
                <option [ngValue]="customer.id">{{ customer.firstName }} {{ customer.lastName }}</option>
              }
            </select>
          </div>

          <div class="form-group">
            <label for="note">Poznámka</label>
            <input id="note" type="text" formControlName="note">
          </div>

          <button type="submit" class="btn btn-primary" style="margin-right: 10px;" [disabled]="simForm.invalid">Uložiť</button>
          <button type="button" class="btn btn-secondary" (click)="cancel()">Zrušiť</button>
        </form>
      </div>
    </div>
  `
})
export class SimFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private simService = inject(SimService);
  private customerService = inject(CustomerService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = false;
  simId?: number;
  customers: Customer[] = [];

  simForm: FormGroup = this.fb.group({
    iccid: ['', [Validators.required, Validators.minLength(19), Validators.maxLength(22)]],
    imsi: [''],
    type: ['', Validators.required],
    status: ['IN_STOCK'],
    customerId: [null],
    note: ['']
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
        this.simForm.patchValue({
          iccid: sim.iccid,
          imsi: sim.imsi || '',
          type: sim.type,
          status: sim.status,
          customerId: sim.customerId ?? null,
          note: sim.note || ''
        });
      }
    });
  }

  onSubmit() {
    if (this.simForm.invalid) {
      this.simForm.markAllAsTouched();
      return;
    }

    const request: SimCardRequest = this.simForm.value;

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
