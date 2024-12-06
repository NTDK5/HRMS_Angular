import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { SalaryListComponent } from './components/salary-list/salary-list.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'candidates', component: CandidateListComponent },
  { path: 'companies', component: CompanyListComponent },
  { path: 'departments', component: DepartmentListComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'salaries', component: SalaryListComponent }
];
