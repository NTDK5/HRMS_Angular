import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const companies = [
      { id: 1, name: 'Tech Corp', location: 'San Francisco', industry: 'Technology' },
      { id: 2, name: 'Finance Plus', location: 'New York', industry: 'Finance' },
      { id: 3, name: 'Green Energy', location: 'Boston', industry: 'Energy' }
    ];

    const departments = [
      { id: 1, name: 'Engineering', companyId: 1 },
      { id: 2, name: 'Marketing', companyId: 1 },
      { id: 3, name: 'Finance', companyId: 2 },
      { id: 4, name: 'Research', companyId: 3 }
    ];

    const employees = [
      { id: 1, name: 'John Doe', email: 'john@techcorp.com', phone: '123-456-7890', companyId: 1, departmentId: 1 },
      { id: 2, name: 'Jane Smith', email: 'jane@techcorp.com', phone: '123-456-7891', companyId: 1, departmentId: 2 },
      { id: 3, name: 'Bob Wilson', email: 'bob@finance.com', phone: '123-456-7892', companyId: 2, departmentId: 3 }
    ];

    const candidates = [
      { id: 1, name: 'Alice Brown', email: 'alice@email.com', phone: '123-456-7893', positionApplied: 'Software Engineer', status: 'pending' },
      { id: 2, name: 'Charlie Davis', email: 'charlie@email.com', phone: '123-456-7894', positionApplied: 'Marketing Manager', status: 'accepted' }
    ];

    const salaries = [
      { id: 1, employeeId: 1, amount: 85000, paymentDate: '2024-03-01' },
      { id: 2, employeeId: 2, amount: 75000, paymentDate: '2024-03-01' },
      { id: 3, employeeId: 3, amount: 95000, paymentDate: '2024-03-01' }
    ];

    return { companies, departments, employees, candidates, salaries };
  }

  genId(collection: any[]): number {
    return collection.length > 0 ? Math.max(...collection.map(item => item.id)) + 1 : 1;
  }
} 