import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="drawer.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>HR Management</span>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav #drawer mode="side" opened>
        <mat-nav-list>
          <a mat-list-item routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            <mat-icon>dashboard</mat-icon>
            <span>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/employees" routerLinkActive="active">
            <mat-icon>people</mat-icon>
            <span>Employees</span>
          </a>
          <a mat-list-item routerLink="/departments" routerLinkActive="active">
            <mat-icon>business</mat-icon>
            <span>Departments</span>
          </a>
          <a mat-list-item routerLink="/companies" routerLinkActive="active">
            <mat-icon>apartment</mat-icon>
            <span>Companies</span>
          </a>
          <a mat-list-item routerLink="/candidates" routerLinkActive="active">
            <mat-icon>person_add</mat-icon>
            <span>Candidates</span>
          </a>
          <a mat-list-item routerLink="/salaries" routerLinkActive="active">
            <mat-icon>payments</mat-icon>
            <span>Salaries</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    mat-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
    }

    mat-sidenav-container {
      flex: 1;
      margin-top: 64px;
    }

    mat-sidenav {
      width: 250px;
      // background-color: #f5f5f5;
    }

    .content {
      padding: 20px;
    }

    mat-nav-list {
      padding-top: 100px;
    }

    mat-nav-list a {
      display: flex;
      align-items: center;
      gap: 16px;
      height: 48px;
    }

    .active {
      background-color: #e0e0e036;
    }

    mat-icon {
      margin-right: 8px;
    }
  `]
})
export class AppComponent {
  title = 'HR Management';
}
