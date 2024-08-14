import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDataList, TuiSurface } from '@taiga-ui/core';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiMultiSelectModule, TuiInputModule, TuiInputPasswordModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, TuiCardLarge, TuiSurface, TuiInputModule, TuiTextfieldControllerModule, TuiInputPasswordModule, TuiButton, TuiMultiSelectModule, TuiDataListWrapper, TuiDataList],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signup_form!: FormGroup;
  protected system_role = ["Data Manager", "Analyst"];
  ngOnInit() {
    this.signup_form = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      role: new FormControl<string[]>([], Validators.required),
      username: new FormControl<string>('', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z0-9_-]*$')]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
}