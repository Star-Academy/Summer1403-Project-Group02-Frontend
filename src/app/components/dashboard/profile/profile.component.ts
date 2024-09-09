import { UpperCasePipe, TitleCasePipe, NgForOf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  INJECTOR,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiButton,
  TuiIcon,
  TuiTitle,
  TuiSurface,
  TuiTextfield,
  TuiDialogService,
} from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiButtonLoading,
  TuiChip,
  TuiFade,
  TUI_CONFIRM,
} from '@taiga-ui/kit';
import { TuiBlockStatus, TuiCardLarge } from '@taiga-ui/layout';
import { AvatarTextPipe } from '../../../pipes/avatar-text.pipe';
import { UsernamePipe } from '../../../pipes/username.pipe';
import { RoleAppearancePipe } from '../../../pipes/role-appearance.pipe';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { ChangePassDialogComponent } from './change-pass-dialog/change-pass-dialog.component';
import type { TuiConfirmData } from '@taiga-ui/kit';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    TuiIcon,
    TuiButtonLoading,
    TuiInputModule,
    TuiTextfield,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TuiSurface,
    TuiFade,
    TuiTitle,
    TuiButton,
    TitleCasePipe,
    TuiCardLarge,
    ReactiveFormsModule,
    TuiAvatar,
    UpperCasePipe,
    UsernamePipe,
    AvatarTextPipe,
    RoleAppearancePipe,
    TuiChip,
    NgForOf,
    TuiBlockStatus,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  protected name = 'name family';
  protected username = 'name_family';
  protected roles = ['Admin', 'Developer'];

  private readonly dialogs = inject(TuiDialogService);
  private readonly injector = inject(INJECTOR);

  private readonly changePassDialog = this.dialogs.open(
    new PolymorpheusComponent(ChangePassDialogComponent, this.injector)
  );

  private readonly editDialog = this.dialogs.open(
    new PolymorpheusComponent(EditDialogComponent, this.injector)
  );

  constructor(private authService: AuthService, private router: Router) {}

  protected github_repo!: string;

  ngOnInit(): void {
    this.github_repo = environment.githubRepo;

    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.name = `${user.firstName} ${user.lastName}`;
        this.username = user.username;
        this.roles = user.roles.map((role) => role.roleType);
      }
    });
  }

  showChangePassDialog(): void {
    this.changePassDialog.subscribe();
  }

  showUpdateInfoDialog(): void {
    this.editDialog.subscribe();
  }

  showLogoutDialog(): void {
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
