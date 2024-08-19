import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { TuiDialogContext } from '@taiga-ui/core';
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
    FormsModule,
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

  protected old_pass = '';
  protected new_pass = '';
  protected loading = false;

  constructor(private changePasswordService: ChangePasswordService) {}

  protected hasValid(): boolean {
    return this.old_pass !== '' && this.new_pass !== '';
  }

  protected submit(): void {
    if (this.hasValid()) {
      this.changePasswordService
        .changePassword('test2', this.old_pass, this.new_pass)
        .subscribe({
          next: (response) => {
            console.log('Password changed successfully:', response.message);
            this.context.completeWith();
          },
          error: (error) => {
            console.error('Failed to change password:', error.message);
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }
}
