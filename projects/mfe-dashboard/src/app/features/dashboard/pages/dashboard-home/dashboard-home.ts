import { Component } from '@angular/core';

/**
 * Home page for the dashboard remote.
 *
 * This screen simulates an executive overview page and proves
 * that the remote is working independently but can still be composed
 * by the shell.
 */
@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.scss'
})
export class DashboardHome {
  readonly stats = [
    { label: 'Total Revenue', value: '$1.2M' },
    { label: 'Open Orders', value: '342' },
    { label: 'Pending Approvals', value: '18' },
    { label: 'Active Users', value: '1,284' }
  ];
}