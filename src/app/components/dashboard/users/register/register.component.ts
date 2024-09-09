import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiButton, TuiDialogContext, TuiLink, TuiTitle } from '@taiga-ui/core';
import { TuiCheckbox } from '@taiga-ui/kit';
import {
  TuiInputDateModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandDirective,
} from '@taiga-ui/legacy';
import { TuiDataList } from '@taiga-ui/core';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import {
  TuiMultiSelectModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { AdminUserService } from '../../../../services/admin/admin.service';
import { UserBody } from '../../../../models/api/userBody';
import { RoleResponse } from '../../../../models/api/roleResponse';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiLink,
    TuiTitle,
    TuiButton,
    TuiCheckbox,
    TuiInputDateModule,
    TuiIslandDirective,
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
    TuiDataListWrapper,
    TuiDataList,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private readonly context = inject<TuiDialogContext>(POLYMORPHEUS_CONTEXT);
  private readonly adminUserService = inject(AdminUserService);

  rej_form!: FormGroup;
  protected roles_item!: string[];

  ngOnInit(): void {
    this.adminUserService.fetchRoles().subscribe({
      next: (response: RoleResponse) => {
        this.roles_item = response.data.map((role) => role.roleType);
      },
    });

    this.rej_form = new FormGroup({
      userName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$'
        ),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      roles: new FormControl([], [Validators.required]),
    });
  }

  protected rejSubmit() {
    if (this.rej_form.valid) {
      // Construct the user data from the form
      const userRequest: UserBody = {
        username: this.rej_form.value.userName,
        password: this.rej_form.value.password,
        firstName: this.rej_form.value.firstName,
        lastName: this.rej_form.value.lastName,
        email: this.rej_form.value.email,
        roles: this.rej_form.value.roles,
      };

      // Call the service to create the user
      this.adminUserService.createUser(userRequest).subscribe({
        next: () => {
          // close dialog
          this.context.completeWith();
        },
      });
    } else {
      // Optionally, show a validation error message
      console.error('Form is invalid');
      this.rej_form.markAsDirty();
    }
  }

  protected cancel() {
    this.context.completeWith();
  }
}
