import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/legacy';
import { TuiButton, TuiSurface } from '@taiga-ui/core';
import { TuiCheckbox } from '@taiga-ui/kit';
import { TuiCardLarge } from '@taiga-ui/layout';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiButton,
    TuiCheckbox,
    TuiCardLarge,
    TuiSurface,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  protected github_repo!: string;
  route = inject(ActivatedRoute);

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.github_repo = environment.githubRepo;
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(32),
      ]),
    });
  }

  onSubmit(): void {
    console.log('hellll');

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const credentials = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.authService.loginUser(credentials).subscribe({
      next: () => {
        const returnUrl =
          this.route.snapshot.queryParamMap.get('returnUrl') || '/';

        this.router.navigate([returnUrl]);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      },
    });
  }
}
