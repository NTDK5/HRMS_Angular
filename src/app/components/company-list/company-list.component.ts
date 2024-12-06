import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { CompanyDialogComponent } from '../dialogs/company-dialog/company-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
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
export class CompanyListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'location', 'industry', 'actions'];
  dataSource = new MatTableDataSource<Company>();

  constructor(
    private companyService: CompanyService,
    private dialog: MatDialog       
  ) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(companies => {
      this.dataSource.data = companies;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(CompanyDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.companyService.addCompany(result).subscribe(() => {
          this.loadCompanies();
        });
      }
    });
  }

  edit(company: Company): void {
    const dialogRef = this.dialog.open(CompanyDialogComponent, {
      data: company
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.companyService.updateCompany(result).subscribe(() => {
          this.loadCompanies();
        });
      }
    });
  }

  delete(id: number): void {
    this.companyService.deleteCompany(id).subscribe(() => {
      this.loadCompanies();
    });
  }
} 