import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerRequest } from '../../../core/models/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <div class="card" style="max-width: 600px; margin: 20px auto;">
        <h2 style="margin-bottom: 20px;">{{ isEditMode ? 'Upraviť zákazníka' : 'Pridať zákazníka' }}</h2>

        <form [formGroup]="customerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="firstName">Meno *</label>
            <input id="firstName" type="text" formControlName="firstName">
            @if (customerForm.get('firstName')?.invalid && customerForm.get('firstName')?.touched) {
              <div class="error-text">Meno je povinné</div>
            }
          </div>

          <div class="form-group">
            <label for="lastName">Priezvisko *</label>
            <input id="lastName" type="text" formControlName="lastName">
            @if (customerForm.get('lastName')?.invalid && customerForm.get('lastName')?.touched) {
              <div class="error-text">Priezvisko je povinné</div>
            }
          </div>

          <div class="form-group">
            <label for="email">E-mail *</label>
            <input id="email" type="email" formControlName="email">
            @if (customerForm.get('email')?.invalid && customerForm.get('email')?.touched) {
              <div class="error-text">Zadaj platný e-mail</div>
            }
          </div>

          <div class="form-group">
            <label for="phone">Telefón</label>
            <input id="phone" type="text" formControlName="phone">
          </div>

          <button type="submit" class="btn btn-primary" style="margin-right: 10px;" [disabled]="customerForm.invalid">Uložiť</button>
          <button type="button" class="btn btn-secondary" (click)="cancel()">Zrušiť</button>
        </form>
      </div>
    </div>
  `
})
export class CustomerFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = false;
  customerId?: number;

  customerForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.maxLength(20)]]
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.customerId = +id;
      this.loadCustomer(this.customerId);
    }
  }

  loadCustomer(id: number) {
    this.customerService.getById(id).subscribe({
      next: (customer) => {
        this.customerForm.patchValue({
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone || ''
        });
      }
    });
  }

  onSubmit() {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    const request: CustomerRequest = this.customerForm.value;

    if (this.isEditMode && this.customerId) {
      this.customerService.update(this.customerId, request).subscribe({
        next: () => this.router.navigate(['/customers'])
      });
    } else {
      this.customerService.create(request).subscribe({
        next: () => this.router.navigate(['/customers'])
      });
    }
  }

  cancel() {
    this.router.navigate(['/customers']);
  }
}
