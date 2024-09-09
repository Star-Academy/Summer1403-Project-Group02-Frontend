import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogComponent } from './edit-dialog.component';
import { of } from 'rxjs';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { TuiButton, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonLoading } from '@taiga-ui/kit';
import { UserUpdateService } from '../../../../services/user/user-update.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { By } from '@angular/platform-browser';

describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditDialogComponent,
        TuiTitle,
        TuiInputModule,
        TuiTextfield,
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
        TuiButton,
        TuiButtonLoading,
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
          provide: FormBuilder,
          useClass: FormBuilder,
        },
        {
          provide: UserUpdateService,
          useValue: jasmine.createSpyObj({
            editUser: of({
              data: {
                username: 'testuser',
                firstName: 'Test',
                lastName: 'User',
                email: 'test@test.test',
                roles: [{ roleType: 'Admin' }],
              },
              type: 200,
              message: 'string',
            }),
          }),
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj({
            getCurrentUser: of({
              username: 'testuser',
              firstName: 'Test',
              lastName: 'User',
              email: 'test@test.co',
              roles: [{ roleType: 'Admin' }],
            }),
          }),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call the authService's getCurrentUser method", () => {
    const authService = TestBed.inject(AuthService);
    expect(authService.getCurrentUser).toHaveBeenCalled();
  });

  it('should inputs have user info when init', () => {
    expect(component.form.controls['name'].value).toEqual('Test');
    expect(component.form.controls['family'].value).toEqual('User');
    expect(component.form.controls['email'].value).toEqual('test@test.co');
  });

  it('should make the name control required and validate its length', () => {
    const nameControl = component.form.get('name');
    nameControl?.setValue('');
    expect(nameControl?.valid).toBeFalse();

    nameControl?.setValue('A');
    expect(nameControl?.valid).toBeFalse();

    nameControl?.setValue('AB');
    expect(nameControl?.valid).toBeFalse();

    nameControl?.setValue('ABC');
    expect(nameControl?.valid).toBeTrue();
  });

  it('should make the family control required and validate its length', () => {
    const familyControl = component.form.get('family');
    familyControl?.setValue('');
    expect(familyControl?.valid).toBeFalse();

    familyControl?.setValue('A');
    expect(familyControl?.valid).toBeFalse();

    familyControl?.setValue('AB');
    expect(familyControl?.valid).toBeFalse();

    familyControl?.setValue('ABC');
    expect(familyControl?.valid).toBeTrue();
  });

  it('should validate the email control', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('user@example.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('disables the submit button when the edit form is invalid', () => {
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );
    component.form.setValue({
      name: '',
      family: '',
      email: '',
    });

    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeTrue();
  });

  it('enables the submit button when the edit form is valid', () => {
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );
    component.form.setValue({
      name: 'wwweeee',
      family: 'Doe',
      email: 'John@Doe.dev',
    });

    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeFalse();
  });

  it('should call the update service when the form is submitted', () => {
    const updateService = TestBed.inject(UserUpdateService);
    const formValue = {
      name: 'John',
      family: 'Doe',
      email: 'John@Doe.dev',
    };
    component.form.setValue(formValue);

    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );
    submitButton.nativeElement.click();

    expect(updateService.editUser).toHaveBeenCalledWith(
      formValue.name,
      formValue.family,
      formValue.email
    );
  });
});
