import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/legacy';
import { TuiButton, TuiSurface } from '@taiga-ui/core';
import { TuiCheckbox } from '@taiga-ui/kit';
import { TuiCardLarge } from '@taiga-ui/layout';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TuiInputModule,
        TuiInputPasswordModule,
        TuiButton,
        TuiCheckbox,
        TuiCardLarge,
        TuiSurface,
        LoginComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with email and password controls', () => {
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('password')).toBeTrue();
  });

  it('should make the email control required', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();
  });

  it('should make the password control required and within valid length', () => {
    const passwordControl = component.form.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalse();
    passwordControl?.setValue('123');
    expect(passwordControl?.valid).toBeTrue();
  });

  it('should render the "Sign in" text inside the tuiCardLarge', () => {
    const cardTitle = fixture.debugElement.query(
      By.css('.tui-island__title')
    ).nativeElement;
    expect(cardTitle.textContent).toContain('Sign in');
  });

  it('should render a login button', () => {
    const loginButton = fixture.debugElement.query(
      By.css('a[appearance="accent"]')
    );
    expect(loginButton).toBeTruthy();
    expect(loginButton.nativeElement.textContent).toContain('Login');
  });
});
