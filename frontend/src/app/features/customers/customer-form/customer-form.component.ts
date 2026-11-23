import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormField, form, required, email, maxLength } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerRequest } from '../../../core/models/customer.model';

interface CustomerFormModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-customer-form',
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="container">
      <div class="card" style="max-width: 600px; margin: 20px auto;">
        <h2 style="margin-bottom: 20px;">{{ isEditMode ? 'Upraviť zákazníka' : 'Pridať zákazníka' }}</h2>

        <form (submit)="onSubmit($event)">
          <div class="form-group">
            <label for="firstName">Meno *</label>
            <input id="firstName" type="text" [formField]="customerForm.firstName">
            @if (customerForm.firstName().touched() && customerForm.firstName().invalid()) {
              <div class="error-text">Meno je povinné (max. 50 znakov)</div>
            }
          </div>

          <div class="form-group">
            <label for="lastName">Priezvisko *</label>
            <input id="lastName" type="text" [formField]="customerForm.lastName">
            @if (customerForm.lastName().touched() && customerForm.lastName().invalid()) {
              <div class="error-text">Priezvisko je povinné (max. 50 znakov)</div>
            }
          </div>

          <div class="form-group">
            <label for="email">E-mail *</label>
            <input id="email" type="email" [formField]="customerForm.email">
            @if (customerForm.email().touched() && customerForm.email().invalid()) {
              <div class="error-text">Zadaj platný e-mail (max. 100 znakov)</div>
            }
          </div>

          <div class="form-group">
            <label for="phone">Telefón</label>
            <input id="phone" type="text" [formField]="customerForm.phone">
            @if (customerForm.phone().touched() && customerForm.phone().invalid()) {
              <div class="error-text">Telefón môže mať max. 20 znakov</div>
            }
          </div>

          <button type="submit" class="btn btn-primary" style="margin-right: 10px;" [disabled]="customerForm().invalid()">Uložiť</button>
          <button type="button" class="btn btn-secondary" (click)="cancel()">Zrušiť</button>
        </form>
      </div>
    </div>
  `
})
export class CustomerFormComponent implements OnInit {
  private customerService = inject(CustomerService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = false;
  customerId?: number;

  readonly customerModel = signal<CustomerFormModel>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  readonly customerForm = form(this.customerModel, (path) => {
    required(path.firstName);
    maxLength(path.firstName, 50);
    required(path.lastName);
    maxLength(path.lastName, 50);
    required(path.email);
    email(path.email);
    maxLength(path.email, 100);
    maxLength(path.phone, 20);
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
        this.customerModel.set({
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone || ''
        });
      }
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.customerForm().invalid()) {
      this.customerForm().markAsTouched();
      return;
    }

    const value = this.customerForm().value();
    const request: CustomerRequest = {
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      phone: value.phone || undefined
    };

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
