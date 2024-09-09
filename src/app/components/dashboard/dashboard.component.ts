// import angular
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

// import tui
import {
  TuiButton,
  TuiDialogService,
  TuiIcon,
  TuiScrollbar,
} from '@taiga-ui/core';
import {
  TUI_CONFIRM,
  TuiBadgeNotification,
  TuiConfirmData,
  TuiFade,
} from '@taiga-ui/kit';
import { TuiCardLarge, TuiNavigation } from '@taiga-ui/layout';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  imports: [
    TuiNavigation,
    TuiScrollbar,
    TuiButton,
    TuiIcon,
    TuiFade,
    TuiBadgeNotification,
    TitleCasePipe,
    TuiCardLarge,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  protected expanded = true;

  constructor(
    private dialogs: TuiDialogService,
    private authService: AuthService,
    private router: Router
  ) {}

  isPcMode(): boolean {
    const pcModeThreshold = 768;
    return window.innerWidth >= pcModeThreshold;
  }

  buttonSize(): TuiButton['size'] {
    return this.isPcMode() ? 'm' : 's';
  }

  logout() {
    const data: TuiConfirmData = {
      content: 'Are you sure you want to logout?',
      yes: 'Yes',
      no: 'No',
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Logout',
        size: 's',
        data,
      })
      .subscribe({
        next: (result) => {
          if (result) {
            this.authService.logOutUser().subscribe({
              next: () => {
                this.router.navigate(['/login']);
              },
            });
          }
        },
      });
  }
}
