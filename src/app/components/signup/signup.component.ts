import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiSurface } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiInputModule, TuiInputPasswordModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, TuiCardLarge, TuiSurface, TuiInputModule, TuiTextfieldControllerModule, TuiInputPasswordModule, TuiButton],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signup_form!: FormGroup;

  ngOnInit() {
    this.signup_form = new FormGroup({
      name: new FormControl(null, Validators.required),
      username: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z0-9_-]*$')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
}