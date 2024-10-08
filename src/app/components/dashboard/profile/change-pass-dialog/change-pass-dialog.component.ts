import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { TuiButton, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiButtonLoading } from '@taiga-ui/kit';
import {
  TuiInputPasswordModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { ChangePasswordService } from '../../../../services/user/change-password.service';

@Component({
  standalone: true,
  imports: [
    TuiTitle,
    TuiInputPasswordModule,
    TuiTextfield,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiButton,
    TuiButtonLoading,
  ],
  selector: 'app-change-pass-dialog',
  templateUrl: './change-pass-dialog.component.html',
  styleUrls: ['./change-pass-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePassDialogComponent {
  private readonly context = inject<TuiDialogContext>(POLYMORPHEUS_CONTEXT);

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private changePasswordService: ChangePasswordService
  ) {
    this.form = this.fb.group({
      oldPass: ['', [Validators.required]],
      newPass: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$'
          ),
        ],
      ],
    });
  }

  protected submit(): void {
    if (this.form.valid) {
      const { oldPass, newPass } = this.form.value;

      this.changePasswordService.changePassword(oldPass, newPass).subscribe({
        next: () => {
          this.context.completeWith();
        },
      });
    }
  }
}
