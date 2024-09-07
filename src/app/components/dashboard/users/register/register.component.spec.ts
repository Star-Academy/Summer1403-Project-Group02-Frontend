import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/legacy';
import { TuiButton, TuiLink } from '@taiga-ui/core';
import { TuiCheckbox } from '@taiga-ui/kit';
import { TuiInputDateModule } from '@taiga-ui/legacy';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TuiInputModule,
        TuiInputPasswordModule,
        TuiButton,
        TuiLink,
        TuiCheckbox,
        TuiInputDateModule,
        RegisterComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required controls', () => {
    expect(component.rej_form.contains('firstName')).toBeTrue();
    expect(component.rej_form.contains('lastName')).toBeTrue();
    expect(component.rej_form.contains('password')).toBeTrue();
    expect(component.rej_form.contains('email')).toBeTrue();
    expect(component.rej_form.contains('dob')).toBeTrue();
  });

  it('should make the firstName control required and validate its length', () => {
    const firstNameControl = component.rej_form.get('firstName');
    firstNameControl?.setValue('');
    expect(firstNameControl?.valid).toBeFalse();

    firstNameControl?.setValue('A');
    expect(firstNameControl?.valid).toBeFalse();

    firstNameControl?.setValue('John');
    expect(firstNameControl?.valid).toBeTrue();
  });

  it('should make the lastName control required and validate its length', () => {
    const lastNameControl = component.rej_form.get('lastName');
    lastNameControl?.setValue('');
    expect(lastNameControl?.valid).toBeFalse();

    lastNameControl?.setValue('D');
    expect(lastNameControl?.valid).toBeFalse();

    lastNameControl?.setValue('Doe');
    expect(lastNameControl?.valid).toBeTrue();
  });

  it('should validate the email control', () => {
    const emailControl = component.rej_form.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('user@example.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should make the password control required and validate its length', () => {
    const passwordControl = component.rej_form.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalse();

    passwordControl?.setValue('abc');
    expect(passwordControl?.valid).toBeFalse();

    passwordControl?.setValue('strongpassword');
    expect(passwordControl?.valid).toBeTrue();
  });

  it('should validate the dob control as required', () => {
    const dobControl = component.rej_form.get('dob');
    dobControl?.setValue('');
    expect(dobControl?.valid).toBeFalse();

    dobControl?.setValue('2000-01-01');
    expect(dobControl?.valid).toBeTrue();
  });

  it('should render the "Register" title inside the tuiIsland', () => {
    const titleElement = fixture.debugElement.query(
      By.css('.tui-island__title')
    ).nativeElement;
    expect(titleElement.textContent).toContain('Register');
  });

  it('should render a register button', () => {
    const registerButton = fixture.debugElement.query(
      By.css('a[appearance="accent"]')
    );
    expect(registerButton).toBeTruthy();
    expect(registerButton.nativeElement.textContent).toContain('Register');
  });
});
