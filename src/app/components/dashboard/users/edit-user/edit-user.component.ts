import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiAlertService, TuiButton, TuiDialogContext, TuiLink, TuiTitle } from '@taiga-ui/core';
import { TuiCheckbox } from '@taiga-ui/kit';
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
    TuiButton,
    TuiCheckbox,
    TuiTextfieldControllerModule,
    TuiDataListWrapper,
    TuiDataList,
  ],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  private readonly context = inject<TuiDialogContext>(POLYMORPHEUS_CONTEXT);
  private readonly adminEditUserService = inject(AdminEditUserService);
  private readonly adminService = inject(AdminUserService);
  private readonly alerts = inject(TuiAlertService);

  edit_form!: FormGroup;
  protected user!: User;

  ngOnInit(): void {

    this.user = this.adminEditUserService.getUser();

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
  }

  protected submit() {
    if (!this.edit_form.invalid) {
      // call api here to edit user

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
