import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/legacy';
import { TuiButton, TuiSurface } from '@taiga-ui/core';
import { TuiCheckbox } from '@taiga-ui/kit';
import { TuiCardLarge } from '@taiga-ui/layout';
import { By } from '@angular/platform-browser';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { LoginResponse } from '../../models/api/loginResponse';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginUser']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

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
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with username and password controls', () => {
    expect(component.form.contains('username')).toBeTrue();
    expect(component.form.contains('password')).toBeTrue();
  });

  it('should make the username control required', () => {
    const usernameControl = component.form.get('username');
    usernameControl?.setValue('');
    expect(usernameControl?.valid).toBeFalse();
  });

  it('should make the password control required and within valid length', () => {
    const passwordControl = component.form.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalse();

    passwordControl?.setValue('123');
    expect(passwordControl?.valid).toBeTrue();

    passwordControl?.setValue('a'.repeat(33));
    expect(passwordControl?.valid).toBeFalse();
  });

  it('should render the "Welcome Back" text inside the tuiCardLarge', () => {
    const cardTitle = fixture.debugElement.query(
      By.css('.tui-island__title')
    ).nativeElement;
    expect(cardTitle.textContent).toContain('Welcome Back');
  });

  it('should render a login button', () => {
    const loginButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );
    expect(loginButton).toBeTruthy();
    expect(loginButton.nativeElement.textContent).toContain('Login');
  });

  it('should disable the login button if the form is invalid or loading', () => {
    component.form.get('username')?.setValue('');
    component.form.get('password')?.setValue('');
    fixture.detectChanges();

    const loginButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement;
    expect(loginButton.disabled).toBeTrue();

    component.loading = true;
    fixture.detectChanges();
    expect(loginButton.disabled).toBeTrue();
  });

  it('should call AuthService.loginUser on form submit', () => {
    const credentials = { username: 'admin', password: 'admin' };

    const mockResponse: LoginResponse = {
      data: {
        username: 'admin',
        firstName: '',
        lastName: '',
        email: '',
        roles: [{ roleType: 'SystemAdmin' }],
      },
      type: 200,
      message: 'Login Successfully',
    };

    authServiceSpy.loginUser.and.returnValue(of(mockResponse));

    component.form.setValue(credentials);

    component.onSubmit();

    expect(authServiceSpy.loginUser).toHaveBeenCalledWith(credentials);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle login errors', () => {
    const errorResponse = { message: 'Invalid credentials' };
    authServiceSpy.loginUser.and.returnValue(throwError(errorResponse));
    component.form.setValue({ username: 'testuser', password: 'wrongpass' });

    component.onSubmit();

    expect(component.loading).toBeFalse();
    expect(component.errorMessage).toBe(errorResponse.message);
  });

  it('should not submit the form if it is invalid', () => {
    spyOn(component, 'onSubmit').and.callThrough();

    component.form.setValue({ username: '', password: '' });
    fixture.detectChanges();

    const formElement: DebugElement = fixture.debugElement.query(
      By.css('form')
    );
    formElement.triggerEventHandler('ngSubmit', null);

    expect(authServiceSpy.loginUser).not.toHaveBeenCalled();
  });
});
