import { NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  INJECTOR,
  ChangeDetectionStrategy,
  signal,
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
import { TuiCardLarge, TuiHeader, TuiBlockStatus } from '@taiga-ui/layout';
import { RoleAppearancePipe } from '../../../pipes/role-appearance.pipe';
import { UsernamePipe } from '../../../pipes/username.pipe';
import type { TuiConfirmData } from '@taiga-ui/kit';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { RegisterComponent } from './register/register.component';
import { AdminUserService } from '../../../services/admin/admin.service';
import { User } from '../../../models/user';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AdminEditUserService } from '../../../services/admin/admin-edit-user.service';

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
    TuiBlockStatus,
    TuiChip,
    NgForOf,
    NgIf,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  private readonly dialogs = inject(TuiDialogService);
  private readonly injector = inject(INJECTOR);
  private readonly adminUserService = inject(AdminUserService);
  private readonly adminEditUserService = inject(AdminEditUserService);
  
  protected page_index!: number;
  protected page_valid!: boolean;
  
  // Use the signal API to store the users
  protected users = signal<User[]>([]);

  //? default users to tests and etc
  // protected users = signal<User[]>([{
  //   username: "Admin",
  //   firstName: "Name",
  //   lastName: "Family",
  //   email: "admin@admin.admin",
  //   roles: [{ roleType: "Admin" }],
  // }
  // ]);

  private readonly rejDialog = this.dialogs.open(
    new PolymorpheusComponent(RegisterComponent, this.injector)
  );

  private readonly edit_user_dialog = this.dialogs.open(
    new PolymorpheusComponent(EditUserComponent, this.injector)
  );

  ngOnInit(): void {
    this.page_index = 1;
    this.page_valid = false;
    this.loadUsers();
  }

  private loadUsers(): void {
    this.adminUserService.fetchUsers(this.page_index).subscribe({
      next: (response) => {
        if (response.data) {
          this.users.set(response.data); // Update the signal with the fetched data
          this.page_valid = true;
        }

        else {
          this.page_valid = false;
        }
      },
      error: (err) => {
        console.error('Failed to load users:', err);
      },
    });
  }

  protected canNext():boolean {
    return this.page_valid;
  }

  protected canPrev():boolean {
    return this.page_index > 1;
  }

  protected nextPage() {
    if (this.canNext()) {
      this.page_index++;
      this.loadUsers();
    }
  }
  
  protected prevPage() {
    if (this.canPrev()) {
      this.page_index--;
      this.loadUsers();
    }
  }

  protected showEditUserDialog(username: string): void {
    const user = this.users().find((user) => user.username === username);
    if (user) {
      this.adminEditUserService.setUser(user);

      this.edit_user_dialog.subscribe({
        complete: () => {
          console.info('Dialog closed');

          this.adminUserService.getUser(username).subscribe({
            next: (response) => {
              const updatedUser = response.data;
              const users = this.users();
              const index = users.findIndex(
                (user) => user.username === username
              );
              users[index] = updatedUser;
              this.users.set(users);
            },
          });
        },
      });
    }
  }

  protected showRejDialog(): void {
    this.rejDialog.subscribe({
      complete: () => {
        // dialog closed
        this.loadUsers(); // Reload users after the dialog closes in case a new user was added
      },
    });
  }

  protected showDeleteDialog(username: string): void {
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
            console.log(username);

            this.deleteUser(username);
          }
        },
      });
  }

  private deleteUser(username: string): void {
    this.adminUserService.deleteUser(username).subscribe({
      next: () => {
        // On successful delete, update the users signal by removing the deleted user
        this.users.set(
          this.users().filter((user) => user.username !== username)
        );
        console.log(`User ${username} deleted successfully`);
      },
    });
  }
}
