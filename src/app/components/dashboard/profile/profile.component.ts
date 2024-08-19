import { UpperCasePipe, TitleCasePipe, NgForOf } from '@angular/common';
import { Component, inject, INJECTOR, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiButton, TuiIcon, TuiTitle, TuiSurface, TuiTextfield, TuiDialogService } from '@taiga-ui/core';
import { TuiAvatar, TuiButtonLoading, TuiChip, TuiFade } from '@taiga-ui/kit';
import { TuiCardLarge } from '@taiga-ui/layout';
import { AvatarTextPipe } from '../../../pipes/avatar-text.pipe';
import { UsernamePipe } from '../../../pipes/username.pipe';
import { RoleAppearancePipe } from '../../../pipes/role-appearance.pipe';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { ChangePassDialogComponent } from './change-pass-dialog/change-pass-dialog.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TuiIcon, TuiButtonLoading, TuiInputModule, TuiTextfield, TuiTextfieldControllerModule, ReactiveFormsModule, TuiSurface, TuiFade, TuiTitle, TuiButton, TitleCasePipe, TuiCardLarge, ReactiveFormsModule, TuiAvatar, UpperCasePipe, UsernamePipe, AvatarTextPipe, RoleAppearancePipe, TuiChip, NgForOf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  protected name = "name family";
  protected username = "name_family";
  protected roles = ["Admin", "Developer"];
  protected enable_edit = false;
  protected loading_btn = false;
  protected info_form!: FormGroup;

  private readonly dialogs = inject(TuiDialogService);
  private readonly injector = inject(INJECTOR);

  private readonly changePassDialog = this.dialogs.open(
    new PolymorpheusComponent(ChangePassDialogComponent, this.injector));

  ngOnInit() {
    this.info_form = new FormGroup({
      first_name: new FormControl<string>('name', Validators.required),
      last_name: new FormControl<string>('family', Validators.required),
      email: new FormControl<string>('mail@mail.com', [Validators.required, Validators.email]),
    });
  }

  editHandler() {
    if (this.enable_edit) {
      if (this.info_form.valid) {
        this.loading_btn = true;
        // send to api

        // if ok
        this.loading_btn = false;
        this.enable_edit = false;
      }
      else {
        this.info_form.markAllAsTouched();
      }

    } else {
      this.enable_edit = true;
    }
  }

  protected showChangePassDialog(): void {
    this.changePassDialog.subscribe({
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }
}

