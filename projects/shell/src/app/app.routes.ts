import { Routes } from '@angular/router';
import { ShellLayout } from './layout/shell-layout/shell-layout';
import { loadRemoteModule } from '@angular-architects/native-federation';

/**
 * Shell route configuration.
 *
 * The shell owns:
 * - top-level layout
 * - route composition
 * - lazy loading of remotes
 *
 * Each remote exposes its own route configuration file.
 * This keeps the shell small and makes each remote independently maintainable.
 */
export const routes: Routes = [
  {
    path: '',
    component: ShellLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          loadRemoteModule('mfeDashboard', './routes').then((m) => m.routes)
      },
      {
        path: 'orders',
        loadChildren: () =>
          loadRemoteModule('mfeOrders', './routes').then((m) => m.routes)
      },
      {
        path: 'admin',
        loadChildren: () =>
          loadRemoteModule('mfeAdmin', './routes').then((m) => m.routes)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
