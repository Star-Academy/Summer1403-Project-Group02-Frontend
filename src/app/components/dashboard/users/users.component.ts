import { NgForOf, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  INJECTOR,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiItem } from '@taiga-ui/cdk';
import {
  TuiButton,
  TuiIcon,
  TuiSurface,
  TuiTitle,
  TuiDialogService,
} from '@taiga-ui/core';
import {
  TuiBadge,
  TuiBadgeNotification,
  TuiBreadcrumbs,
  TuiChip,
  TuiFade,
} from '@taiga-ui/kit';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { RoleAppearancePipe } from '../../../pipes/role-appearance.pipe';
import { UsernamePipe } from '../../../pipes/username.pipe';
import type { TuiConfirmData } from '@taiga-ui/kit';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { RegisterComponent } from './register/register.component';
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
  imports: [
    UsernamePipe,
    TuiIcon,
    TuiFade,
    TuiButton,
    TuiCardLarge,
    TuiSurface,
    TuiHeader,
    TuiTitle,
    TuiBadgeNotification,
    TuiBadge,
    TuiItem,
    TuiBreadcrumbs,
    RouterLink,
    TitleCasePipe,
    RoleAppearancePipe,
    TuiChip,
    NgForOf,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly dialogs = inject(TuiDialogService);
  protected users: Users[] = [
    {
      name: 'name',
      last_name: 'family',
      username: 'name123',
      email: '123@123.com',
      roles: ['Admin', 'Developer'],
    },
    {
      name: 'name',
      last_name: 'family',
      username: 'name123',
      email: '123@123.com',
      roles: ['Admin', 'Developer'],
    },
  ];

  private readonly injector = inject(INJECTOR);

  private readonly rej_dialog = this.dialogs.open(
    new PolymorpheusComponent(RegisterComponent, this.injector)
  );

  protected showRejDialog(): void {
    this.rej_dialog.subscribe({
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }

  protected showDeleteDialog(): void {
    const data: TuiConfirmData = {
      content: 'Are you sure you want to delete this user?',
      yes: 'Yes',
      no: 'No',
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Delete User',
        size: 's',
        data,
      })
      .subscribe({
        next: (result) => {
          if (result) {
            // call api here
          }
        },
      });
  }
}
