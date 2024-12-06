import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../models/candidate.model';
import { CandidateDialogComponent } from '../dialogs/candidate-dialog/candidate-dialog.component';

    @Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
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
export class CandidateListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'positionApplied', 'status', 'actions'];
  dataSource = new MatTableDataSource<Candidate>();

  constructor(
    private candidateService: CandidateService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCandidates();
  }

  loadCandidates(): void {
    this.candidateService.getCandidates()
      .subscribe(candidates => {
        this.dataSource.data = candidates;
      });
  }

  edit(candidate: Candidate): void {
    const dialogRef = this.dialog.open(CandidateDialogComponent, {
      data: candidate
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.candidateService.updateCandidate(result).subscribe(() => {
          this.loadCandidates();
        });
      }
    });
  }

  delete(id: number): void {
    this.candidateService.deleteCandidate(id).subscribe(() => {
      this.loadCandidates();
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(CandidateDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.candidateService.addCandidate(result).subscribe(() => {
          this.loadCandidates();
        });
      }
    });
  }
} 