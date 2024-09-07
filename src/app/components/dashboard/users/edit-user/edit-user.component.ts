import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiAlertService, TuiButton, TuiDialogContext, TuiIcon, TuiLink, TuiTitle } from '@taiga-ui/core';
import { TuiCheckbox, TuiFilter } from '@taiga-ui/kit';
import {
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/legacy';
import { TuiDataList } from '@taiga-ui/core';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import {
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { AdminEditUserService } from '../../../../services/admin/admin-edit-user.service';
import { User } from '../../../../models/user';
import { AdminUserService } from '../../../../services/admin/admin.service';
import { EditUserBody } from '../../../../models/api/editUser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    TuiTitle,
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiLink,
    TuiIcon,
    TuiButton,
    TuiCheckbox,
    TuiTextfieldControllerModule,
    TuiDataListWrapper,
    TuiDataList,
    TuiFilter,
  ],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  private readonly context = inject<TuiDialogContext>(POLYMORPHEUS_CONTEXT);
  private readonly adminEditUserService = inject(AdminEditUserService);
  private readonly adminService = inject(AdminUserService);
  private readonly alerts = inject(TuiAlertService);

  protected edit_form!: FormGroup;
  protected role_form!: FormGroup;
  protected user!: User;
  protected roles!: string[];

  ngOnInit(): void {
    this.user = this.adminEditUserService.getUser();

    this.fetchRoles();

    this.edit_form = new FormGroup({
      firstName: new FormControl(this.user.firstName, [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(this.user.lastName, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
    });

    this.role_form = new FormGroup({
      roles: new FormControl(this.user.roles.map(role => role.roleType) as string[]),
    });
  }

  protected fetchRoles() {
    this.adminService.fetchRoles().subscribe({
      next: (roles) => {
        this.roles = roles.data.map(role => role.roleType);
      }
    });
  }

  protected onToggledRoleItemChange(role: string) {
    const roles = this.role_form.controls['roles'].value as string[];

    if (roles.includes(role)) {
      this.adminService.removeRoleFromUser(this.user.username, role).subscribe({
        next: () => {
          this.alerts.open('Role Removed', { label: 'Success!', appearance: 'success' }).subscribe();
        },
        error: () => {
          const roles = this.role_form.controls['roles'].value as string[];
          roles.push(role);
          this.role_form.controls['roles'].setValue(roles);
        }
      });
    } else {
      this.adminService.addRoleToUser(this.user.username, role).subscribe({
        next: () => {
          this.alerts.open('Role Added', { label: 'Success!', appearance: 'success' }).subscribe();
        },
        error: () => {
          this.role_form.controls['roles'].setValue(this.role_form.controls['roles'].value.filter((r: string) => r !== role));
        }
      });
    }
  }

  protected submit() {
    if (!this.edit_form.invalid) {

      const editBody: EditUserBody = {
        firstName: this.edit_form.value.firstName,
        lastName: this.edit_form.value.lastName,
        email: this.edit_form.value.email,
      }

      this.adminService.updateUser(this.user.username, editBody).subscribe({
        next: () => {
          // close dialog
          this.context.completeWith();
        },
      }
      );

    } else {

      if (this.edit_form.controls['firstName'].invalid) {
        this.alerts.open('Please make sure first name is valid. First name must have at least 3 characters.', { label: 'Invalid Form!', appearance: 'warning' }).subscribe();
      }

      else if (this.edit_form.controls['lastName'].invalid) {
        this.alerts.open('Please make sure last name is valid. Last name must have at least 3 characters.', { label: 'Invalid Form!', appearance: 'warning' }).subscribe();
      }

      else if (this.edit_form.controls['email'].invalid) {
        this.alerts.open('Please make sure email is valid.', { label: 'Invalid Form!', appearance: 'warning' }).subscribe();
      }

      else {
        this.alerts.open('Please make sure all fields are valid', { label: 'Invalid Form!', appearance: 'warning' }).subscribe();
      }
    }
  }
}
