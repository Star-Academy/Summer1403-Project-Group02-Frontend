import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassDialogComponent } from './change-pass-dialog.component';

import { of } from 'rxjs';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { TuiButton, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import {
  TuiInputPasswordModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonLoading } from '@taiga-ui/kit';
import { By } from '@angular/platform-browser';
import { ChangePasswordService } from '../../../../services/user/change-password.service';

describe('ChangePassDialogComponent', () => {
  let component: ChangePassDialogComponent;
  let fixture: ComponentFixture<ChangePassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChangePassDialogComponent,
        TuiTitle,
        TuiInputPasswordModule,
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
          provide: ChangePasswordService,
          useValue: jasmine.createSpyObj({
            changePassword: of({
              data: {},
              type: 200,
              message: 'string',
            }),
          }),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make the oldPass control required and validate its length', () => {
    const oldPassControl = component.form.get('oldPass');
    oldPassControl?.setValue('');
    expect(oldPassControl?.valid).toBeFalse();

    oldPassControl?.setValue('abc');
    expect(oldPassControl?.valid).toBeTrue();
  });

  it('should make the newPass control required and validate its length', () => {
    const newPassControl = component.form.get('newPass');
    newPassControl?.setValue('');
    expect(newPassControl?.valid).toBeFalse();

    newPassControl?.setValue('abc');
    expect(newPassControl?.valid).toBeFalse();

    newPassControl?.setValue('asassasasas');
    expect(newPassControl?.valid).toBeFalse();

    newPassControl?.setValue('StrongnewPass');
    expect(newPassControl?.valid).toBeFalse();

    newPassControl?.setValue('strongpP!@assword');
    expect(newPassControl?.valid).toBeTrue();
  });

  it('disables the submit button when the edit form is invalid', () => {
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );
    component.form.setValue({
      oldPass: '',
      newPass: '',
    });

    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeTrue();
  });

  it('enables the submit button when the edit form is valid', () => {
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );
    component.form.setValue({
      oldPass: 'admin',
      newPass: 'AdminWWEEE@@@123',
    });

    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeFalse();
  });
});
