import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SalaryService } from '../../services/salary.service';
import { EmployeeService } from '../../services/employee.service';
import { SalaryDialogComponent } from '../dialogs/salary-dialog/salary-dialog.component';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    DatePipe,
    CurrencyPipe,
    MatToolbarModule
  ]
})
export class SalaryListComponent implements OnInit {
  displayedColumns: string[] = ['employee', 'amount', 'paymentDate', 'actions'];
  dataSource = new MatTableDataSource<any>();
  employeeNames: Map<number, string> = new Map();

  constructor(
    private salaryService: SalaryService,
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSalaries();
    this.loadEmployeeNames();
  }

  loadSalaries(): void {
    this.salaryService.getSalaries().subscribe(salaries => {
      this.dataSource.data = salaries;
    });
  }

  loadEmployeeNames(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      employees.forEach(employee => {
        if (employee.id) {
          this.employeeNames.set(employee.id, employee.name);
        }
      });
    });
  }

  getEmployeeName(employeeId: number): string {
    return this.employeeNames.get(employeeId) || '';
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(SalaryDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.salaryService.addSalary(result).subscribe(() => {
          this.loadSalaries();
        });
      }
    });
  }

  edit(salary: any): void {
    const dialogRef = this.dialog.open(SalaryDialogComponent, {
      data: salary
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.salaryService.updateSalary(result).subscribe(() => {
          this.loadSalaries();
        });
      }
    });
  }

  delete(id: number): void {
    this.salaryService.deleteSalary(id).subscribe(() => {
      this.loadSalaries();
    });
  }
} 