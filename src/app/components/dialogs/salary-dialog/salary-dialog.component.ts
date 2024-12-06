import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Salary } from '../../../models/salary.model';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-salary-dialog',
  templateUrl: './salary-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class SalaryDialogComponent implements OnInit {
  form: FormGroup;
  isEdit: boolean;
  employees: Employee[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SalaryDialogComponent>,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: Salary
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      employeeId: [data?.employeeId || '', Validators.required],
      amount: [data?.amount || '', [Validators.required, Validators.min(0)]],
      paymentDate: [data?.paymentDate || new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const salary = {
        ...this.form.value,
        id: this.data?.id
      };
      this.dialogRef.close(salary);
    }
  }
} 