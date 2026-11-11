import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/models/customer.model';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2>Zákazníci</h2>
          <a routerLink="/customers/add" class="btn btn-primary">Pridať zákazníka</a>
        </div>

        <table>
          <thead>
            <tr>
              <th>Meno</th>
              <th>Priezvisko</th>
              <th>E-mail</th>
              <th>Telefón</th>
              <th>Akcie</th>
            </tr>
          </thead>
          <tbody>
            @for (customer of customers; track customer.id) {
              <tr>
                <td>{{ customer.firstName }}</td>
                <td>{{ customer.lastName }}</td>
                <td>{{ customer.email }}</td>
                <td>{{ customer.phone || '-' }}</td>
                <td>
                  <button class="btn btn-secondary" style="margin-right: 8px;" (click)="onEdit(customer.id)">Upraviť</button>
                  <button class="btn btn-danger" (click)="onDelete(customer.id)">Zmazať</button>
                </td>
              </tr>
            }
            @if (customers.length === 0) {
              <tr>
                <td colspan="5" style="text-align: center;">Žiadni zákazníci</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class CustomersListComponent implements OnInit {
  private customerService = inject(CustomerService);
  private router = inject(Router);
  customers: Customer[] = [];

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getAll().subscribe({
      next: (data) => this.customers = data
    });
  }

  onEdit(id: number) {
    this.router.navigate(['/customers/edit', id]);
  }

  onDelete(id: number) {
    if (confirm('Naozaj chceš zmazať tohto zákazníka?')) {
      this.customerService.delete(id).subscribe({
        next: () => this.loadCustomers()
      });
    }
  }
}
