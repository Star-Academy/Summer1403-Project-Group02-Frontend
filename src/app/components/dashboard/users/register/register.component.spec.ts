import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandDirective,
  TuiMultiSelectModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { TuiButton, TuiDataList, TuiLink, TuiTitle } from '@taiga-ui/core';
import { TuiCheckbox, TuiDataListWrapper } from '@taiga-ui/kit';
import { TuiInputDateModule } from '@taiga-ui/legacy';
import { By } from '@angular/platform-browser';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { AdminUserService } from '../../../../services/admin/admin.service';
import { RoleResponse } from '../../../../models/api/roleResponse';
import { User } from '../../../../models/user';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiInputPasswordModule,
        TuiLink,
        TuiTitle,
        TuiButton,
        TuiCheckbox,
        TuiInputDateModule,
        TuiIslandDirective,
        TuiMultiSelectModule,
        TuiTextfieldControllerModule,
        TuiDataListWrapper,
        TuiDataList,
      ],
      providers: [
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: jasmine.createSpyObj({
            open: jasmine.createSpyObj({
              afterClosed: of('closed'),
            }),
          }),
        },
        {
          provide: AdminUserService,
          useValue: jasmine.createSpyObj({
            fetchRoles: jasmine.createSpyObj({
              subscribe: new Observable<RoleResponse>((subscriber) => {
                subscriber.next({
                  data: [
                    { roleType: 'Admin' },
                    { roleType: 'User' },
                    { roleType: 'Guest' },
                  ],
                  type: 200,
                  message: 'msg',
                });
                subscriber.complete();
              }),
            }),
            createUser: jasmine.createSpyObj({
              subscribe: new Observable<User>((subscriber) => {
                subscriber.next({
                  username: 'admin',
                  firstName: 'aa',
                  lastName: 'bb',
                  email: 'admin@admin.admin',
                  roles: [{ roleType: 'Admin' }, { roleType: 'User' }],
                });
              }),
            }),
          }),
        },
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
    expect(component.rej_form.contains('userName')).toBeTrue();
    expect(component.rej_form.contains('firstName')).toBeTrue();
    expect(component.rej_form.contains('lastName')).toBeTrue();
    expect(component.rej_form.contains('password')).toBeTrue();
    expect(component.rej_form.contains('email')).toBeTrue();
    expect(component.rej_form.contains('roles')).toBeTrue();
  });

  it('should make the userName control required and validate its length', () => {
    const userNameControl = component.rej_form.get('userName');
    userNameControl?.setValue('');
    expect(userNameControl?.valid).toBeFalse();

    userNameControl?.setValue('A');
    expect(userNameControl?.valid).toBeFalse();

    userNameControl?.setValue('AB');
    expect(userNameControl?.valid).toBeFalse();

    userNameControl?.setValue('ABC');
    expect(userNameControl?.valid).toBeTrue();
  });

  it('should make the firstName control required and validate its length', () => {
    const firstNameControl = component.rej_form.get('firstName');
    firstNameControl?.setValue('');
    expect(firstNameControl?.valid).toBeFalse();

    firstNameControl?.setValue('A');
    expect(firstNameControl?.valid).toBeFalse();

    firstNameControl?.setValue('AB');
    expect(firstNameControl?.valid).toBeFalse();

    firstNameControl?.setValue('ABC');
    expect(firstNameControl?.valid).toBeTrue();
  });

  it('should make the lastName control required and validate its length', () => {
    const lastNameControl = component.rej_form.get('lastName');
    lastNameControl?.setValue('');
    expect(lastNameControl?.valid).toBeFalse();

    lastNameControl?.setValue('A');
    expect(lastNameControl?.valid).toBeFalse();

    lastNameControl?.setValue('AB');
    expect(lastNameControl?.valid).toBeFalse();

    lastNameControl?.setValue('ABC');
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

    passwordControl?.setValue('asassasasas');
    expect(passwordControl?.valid).toBeFalse();

    passwordControl?.setValue('Strongpassword');
    expect(passwordControl?.valid).toBeFalse();

    passwordControl?.setValue('strongpP!@assword');
    expect(passwordControl?.valid).toBeTrue();
  });

  it('should validate the roles control as required', () => {
    const dobControl = component.rej_form.get('roles');
    dobControl?.setValue([]);
    expect(dobControl?.valid).toBeFalse();

    dobControl?.setValue(['Admin']);
    expect(dobControl?.valid).toBeTrue();
  });

  it('should render the "Register" title inside the tuiTitle', () => {
    const titleElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(titleElement.textContent).toContain('Create New User');
  });

  it('should render a register button', () => {
    const registerButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );
    expect(registerButton).toBeTruthy();
    expect(registerButton.nativeElement.textContent).toContain('Register');
  });

  it('disables the submit button when the edit form is invalid', () => {
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );
    component.rej_form.setValue({
      userName: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      roles: [],
    });
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeTrue();
  });

  it('enables the submit button when the edit form is valid', () => {
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );
    component.rej_form.setValue({
      userName: 'wwweeee',
      password: '1234$dedsskhLKKJH',
      firstName: 'John',
      lastName: 'Doe',
      email: 'John@Doe.dev',
      roles: ['Admin'],
    });
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeFalse();
  });
});
