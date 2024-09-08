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

  form!: FormGroup;

  ngOnInit(): void {

    const user: User = this.adminEditUserService.getUser();

    this.form = new FormGroup({
      firstName: new FormControl(user.firstName, [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl(user.lastName, [
        Validators.required,
        Validators.minLength(2),
      ]),
      password: new FormControl(null, [
        // Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
      ]),
      email: new FormControl(user.email, [Validators.required, Validators.email]),
    });
  }

  protected submit() {
    if (!this.form.invalid) {
      // call api here to edit user

      // if OK compelete this 
      this.context.completeWith();
    } else {
      // show errorr
    }
  }
}
