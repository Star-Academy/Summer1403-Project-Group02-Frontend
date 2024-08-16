import { NgForOf, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiItem } from '@taiga-ui/cdk';
import { TuiButton, TuiIcon, TuiSurface, TuiTitle } from '@taiga-ui/core';
import { TuiBadge, TuiBadgeNotification, TuiBreadcrumbs, TuiChip, TuiFade } from '@taiga-ui/kit';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { RoleAppearancePipe } from '../../../pipes/role-appearance.pipe';

interface Users {
  name: string;
  last_name: string;
  username: string;
  email: string;
  roles: string[];
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TuiIcon, TuiFade, TuiButton, TuiCardLarge, TuiSurface, TuiHeader, TuiTitle, TuiBadgeNotification, TuiBadge, TuiItem,
    TuiBreadcrumbs, RouterLink, TitleCasePipe, RoleAppearancePipe, TuiChip, NgForOf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {

  protected users: Users[] = [{
    name: "name",
    last_name: "family",
    username: "name123",
    email: "123@123.com",
    roles: ["Admin", "Developer"]
  },
  {
    name: "name",
    last_name: "family",
    username: "name123",
    email: "123@123.com",
    roles: ["Admin", "Developer"]
  }
  ]




}
