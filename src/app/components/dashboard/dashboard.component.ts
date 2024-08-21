// import angular
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

// import tui
import { TuiButton, TuiIcon, TuiScrollbar } from '@taiga-ui/core';
import { TuiBadgeNotification, TuiFade } from '@taiga-ui/kit';
import { TuiCardLarge, TuiNavigation } from '@taiga-ui/layout';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';

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
export class DashboardComponent implements OnInit {
  protected title = 'FrontEnd App';
  protected full_name = 'name family';
  protected expanded = false;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    const savedCurrentUser = localStorage.getItem('savedCurrentUser');
    if (savedCurrentUser) {
      const parsedUser: User = JSON.parse(savedCurrentUser);
      console.log(parsedUser);

      this.full_name = parsedUser.firstName + ' ' + parsedUser.lastName;
    }
  }
}
