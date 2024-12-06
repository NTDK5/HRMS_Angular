import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee.service';
import { CompanyService } from '../../services/company.service';
import { DepartmentService } from '../../services/department.service';
import { Employee } from '../../models/employee.model';
import { EmployeeDialogComponent } from '../dialogs/employee-dialog/employee-dialog.component';
import { Department } from '../../models/department.model';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule
  ]
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'company', 'department', 'actions'];
  dataSource = new MatTableDataSource<Employee>();
  companyNames: Map<number, string> = new Map();
  departmentNames: Map<number, string> = new Map();

  constructor(
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private departmentService: DepartmentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadCompanyNames();
    this.loadDepartmentNames();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.dataSource.data = employees;
    });
  }

  loadCompanyNames(): void {
    this.companyService.getCompanies().subscribe(companies => {
      companies.forEach(company => {
        if (company.id !== undefined) {
          this.companyNames.set(company.id, company.name);
        }
      });
    });
  }

  loadDepartmentNames(): void {
    this.departmentService.getDepartments().subscribe(departments => {
      departments.forEach(department => {
        if (department.id !== undefined) {
          this.departmentNames.set(department.id, department.name);
        }
      });
    });
  }

  getCompanyName(companyId: number): string {
    return this.companyNames.get(companyId) || '';
  }

  getDepartmentName(departmentId: number): string {
    return this.departmentNames.get(departmentId) || '';
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.addEmployee(result).subscribe(() => {
          this.loadEmployees();
        });
      }
    });
  }

  edit(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: employee
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.updateEmployee(result).subscribe(() => {
          this.loadEmployees();
        });
      }
    });
  }

  delete(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }
} 