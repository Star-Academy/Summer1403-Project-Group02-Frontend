import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiItem } from '@taiga-ui/cdk';
import { TuiButton, TuiIcon, TuiSurface, TuiTitle } from '@taiga-ui/core';
import { TuiBadge, TuiBadgeNotification, TuiBreadcrumbs, TuiFade } from '@taiga-ui/kit';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TuiIcon, TuiFade, TuiButton, TuiCardLarge, TuiSurface, TuiHeader, TuiTitle, TuiBadgeNotification, TuiBadge, TuiItem,
    TuiBreadcrumbs, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent { }
