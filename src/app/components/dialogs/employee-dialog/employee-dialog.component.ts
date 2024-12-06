import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../../../models/employee.model';
import { CompanyService } from '../../../services/company.service';
import { DepartmentService } from '../../../services/department.service';
import { Company } from '../../../models/company.model';
import { Department } from '../../../models/department.model';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class EmployeeDialogComponent implements OnInit {
  form: FormGroup;
  isEdit: boolean;
  companies: Company[] = [];
  departments: Department[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeDialogComponent>,
    private companyService: CompanyService,
    private departmentService: DepartmentService,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      name: [data?.name || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      phone: [data?.phone || '', Validators.required],
      companyId: [data?.companyId || '', Validators.required],
      departmentId: [data?.departmentId || '', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCompanies();
    if (this.form.get('companyId')?.value) {
      this.loadDepartments(this.form.get('companyId')?.value);
    }
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
    });
  }

  loadDepartments(companyId: number): void {
    this.departmentService.getDepartmentsByCompany(companyId).subscribe(departments => {
      this.departments = departments;
    });
  }

  onCompanyChange(companyId: number): void {
    this.form.patchValue({ departmentId: '' });
    this.loadDepartments(companyId);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const employee = {
        ...this.form.value,
        id: this.data?.id
      };
      this.dialogRef.close(employee);
    }
  }
} 