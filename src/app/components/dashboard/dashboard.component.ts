import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    MatGridListModule
  ]
})
export class DashboardComponent implements OnInit {
  cards = [
    { title: 'Employees', icon: 'people', route: '/employees', color: '#2196F3', count: 0 },
    { title: 'Departments', icon: 'business', route: '/departments', color: '#4CAF50', count: 0 },
    { title: 'Companies', icon: 'apartment', route: '/companies', color: '#FF9800', count: 0 },
    { title: 'Candidates', icon: 'person_add', route: '/candidates', color: '#9C27B0', count: 0 },
    { title: 'Salaries', icon: 'payments', route: '/salaries', color: '#F44336', count: 0 }
  ];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts(): void {
    this.dashboardService.getCounts().subscribe(counts => {
      this.cards[0].count = counts.employees;
      this.cards[1].count = counts.departments;
      this.cards[2].count = counts.companies;
      this.cards[3].count = counts.candidates;
      this.cards[4].count = counts.salaries;
    });
  }
} 