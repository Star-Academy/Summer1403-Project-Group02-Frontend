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

  protected step !: number;
  rej_form!: FormGroup;
  role_form!: FormGroup;
  protected roles_item !: string[];

  ngOnInit(): void {
    this.step = 0;
    this.rej_form = new FormGroup({
      userName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });

    this.role_form = new FormGroup({
      roles: new FormControl([], [Validators.required]),
    });
  }

  protected rejSubmit() {
    if (this.rej_form.valid) {
      // Construct the user data from the form
      const userRequest: UserBody = {
        username: this.rej_form.value.userName,
        firstName: this.rej_form.value.firstName,
        lastName: this.rej_form.value.lastName,
        password: this.rej_form.value.password,
        email: this.rej_form.value.email,
      };

      // Call the service to create the user
      this.adminUserService.createUser(userRequest).subscribe({
        next: () => {
          // fetch roles after creted user
          this.adminUserService.fetchRoles().subscribe({
            next: (response: RoleResponse) => {
              this.roles_item = response.data.map((role) => role.roleType);
              this.step = 1;
            },
          })
        },
      });
    }

    else {
      // Optionally, show a validation error message
      console.error('Form is invalid');
      this.rej_form.markAsDirty();
    }
  }

  protected roleSubmit() {
    if (this.role_form.valid) {

      // submit new roles
      for (const r of this.role_form.value.roles) {
        this.adminUserService.addRoleToUser(this.rej_form.value.userName, r).subscribe();
      }

      this.context.completeWith();
    }

    else {
      // Optionally, show a validation error message
      console.error('Form is invalid');
    }
  }

  protected cancel() {
    this.context.completeWith();
  }
}
