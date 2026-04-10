import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

/**
 * Main layout component for the host/shell application.
 *
 * This component provides:
 * - Top header
 * - Left navigation
 * - Main content area
 *
 * In a real enterprise application, this is where we would also attach:
 * - user profile menu
 * - notification center
 * - tenant selector
 * - theme switcher
 * - logout action
 */
@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell-layout.html',
  styleUrl: './shell-layout.scss'
})
export class ShellLayout {}