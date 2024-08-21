import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiButton, TuiDialogContext, TuiLink } from '@taiga-ui/core';
import { TuiCheckbox } from '@taiga-ui/kit';
import {
  TuiInputDateModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandDirective,
} from '@taiga-ui/legacy';
import type { TuiBooleanHandler } from '@taiga-ui/cdk';
import { TuiDataList } from '@taiga-ui/core';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import {
  TuiMultiSelectModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { AdminUserService } from '../../../../services/admin/admin.service';
import { UserBody } from '../../../../models/api/userBody';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiLink,
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

  form!: FormGroup;

  protected search: string | null = '';

  protected tagValidator: TuiBooleanHandler<string> = (tag) =>
    !tag.startsWith('Han');

  ngOnInit(): void {
    this.form = new FormGroup({
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
  }

  protected submit() {
    if (!this.form.invalid) {
      // Construct the user data from the form
      const userRequest: UserBody = {
        username: this.form.value.userName,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        password: this.form.value.password,
        email: this.form.value.email,
      };

      // Call the service to create the user
      this.adminUserService.createUser(userRequest).subscribe({
        next: () => {
          console.log('success');

          this.context.completeWith();
        },
      });
    } else {
      // Optionally, show a validation error message
      console.error('Form is invalid');
    }
  }
}
