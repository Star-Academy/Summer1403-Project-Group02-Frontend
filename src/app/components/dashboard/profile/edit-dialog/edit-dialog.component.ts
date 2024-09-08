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
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { UserUpdateService } from '../../../../services/user/user-update.service';
import { OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  standalone: true,
  imports: [
    TuiTitle,
    TuiInputModule,
    TuiTextfield,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiButton,
    TuiButtonLoading,
  ],
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDialogComponent implements OnInit {
  private readonly context = inject<TuiDialogContext>(POLYMORPHEUS_CONTEXT);

  protected form!: FormGroup;
  protected loading = false;

  constructor(
    private fb: FormBuilder,
    private updateService: UserUpdateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.form = this.fb.group({
        name: [user?.firstName, [Validators.required, Validators.minLength(3)]],
        family: [
          user?.lastName,
          [Validators.required, Validators.minLength(3)],
        ],
        email: [user?.email, [Validators.required, Validators.email]],
      });
    });
  }

  protected submit(): void {
    if (this.form.valid) {
      const { name, family, email } = this.form.value;
      this.loading = true;

      this.updateService.editUser(name, family, email).subscribe({
        next: () => {
          this.authService.loadCurrentUser();
          this.context.completeWith();
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }
}
