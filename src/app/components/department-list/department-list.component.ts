import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DepartmentService } from '../../services/department.service';
import { CompanyService } from '../../services/company.service';
import { Department } from '../../models/department.model';
import { DepartmentDialogComponent } from '../dialogs/department-dialog/department-dialog.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
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
export class DepartmentListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'company', 'actions'];
  dataSource = new MatTableDataSource<Department>();
  companyNames: Map<number, string> = new Map();

  constructor(
    private departmentService: DepartmentService,
    private companyService: CompanyService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadCompanyNames();
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(departments => {
      this.dataSource.data = departments;
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

  getCompanyName(companyId: number): string {
    return this.companyNames.get(companyId) || '';
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DepartmentDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.departmentService.addDepartment(result).subscribe(() => {
          this.loadDepartments();
        });
      }
    });
  }

  edit(department: Department): void {
    const dialogRef = this.dialog.open(DepartmentDialogComponent, {
      data: department
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.departmentService.updateDepartment(result).subscribe(() => {
          this.loadDepartments();
        });
      }
    });
  }

  delete(id: number): void {
    this.departmentService.deleteDepartment(id).subscribe(() => {
      this.loadDepartments();
    });
  }
} 