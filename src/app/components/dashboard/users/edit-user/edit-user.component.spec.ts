import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditUserComponent } from './edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiInputPasswordModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { TuiAlertService, TuiButton, TuiDataList, TuiIcon, TuiLink, TuiTitle } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { TuiCheckbox, TuiDataListWrapper, TuiFilter } from '@taiga-ui/kit';
import { TuiInputDateModule } from '@taiga-ui/legacy';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { AdminEditUserService } from '../../../../services/admin/admin-edit-user.service';
import { AdminUserService } from '../../../../services/admin/admin.service';
import { RoleResponse } from '../../../../models/api/roleResponse';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TuiTitle,
        CommonModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiInputPasswordModule,
        TuiLink,
        TuiIcon,
        TuiButton,
        TuiCheckbox,
        TuiTextfieldControllerModule,
        TuiDataListWrapper,
        TuiDataList,
        TuiFilter,
      ],
      providers: [
        {
            provide: POLYMORPHEUS_CONTEXT,
            useValue: jasmine.createSpyObj({
                open: jasmine.createSpyObj({
                    afterClosed: of('closed')
                })
            })
        },
        {
            provide: AdminEditUserService,
            useValue: jasmine.createSpyObj({
                getUser: 
                    {
                      username: "admin",
                      firstName: "admin",
                      lastName: "adminn",
                      email: "admin@admin.admin",
                      roles: [{roleType: "Admin"}]
                    }
            })
        },
        {
            provide: AdminUserService,
            useValue: jasmine.createSpyObj({
                fetchRoles: jasmine.createSpyObj({
                    subscribe: new Observable<RoleResponse>((subscriber) => {
                      subscriber.next(
                      {
                        data: [
                          {roleType: "Admin"},
                          {roleType: "User"},
                          {roleType: "Guest"}
                        ],
                        type: 200,
                        message: "msg"
                      });
                      subscriber.complete();
                    }
                      
                    )
                    
                }),
                updateUser: jasmine.createSpyObj({
                    subscribe: of({
                      data:  {
                        username: "admin",
                        firstName: "aa",
                        lastName: "bb",
                        email: "admin@admin.admin",
                        roles: []
                      },
                      type: 200,
                      message: "msg",
                    })
                }),
                removeRoleFromUser: jasmine.createSpyObj({
                    subscribe: new Observable<void>()
                }),
                addRoleToUser: jasmine.createSpyObj({
                    subscribe: new Observable<void>()
                })
            }),
             
        },
        {
            provide: TuiAlertService,
            useValue: jasmine.createSpyObj({
              open: jasmine.createSpyObj({
                afterClosed: of('closed')
            })
            })
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required controls', () => {
    expect(component.edit_form.contains('firstName')).toBeTrue();
    expect(component.edit_form.contains('lastName')).toBeTrue();
    expect(component.edit_form.contains('email')).toBeTrue();
  });

  it('should make the firstName control required and validate its length', () => {
    const firstNameControl = component.edit_form.get('firstName');
    firstNameControl?.setValue('');
    expect(firstNameControl?.valid).toBeFalse();

    firstNameControl?.setValue('1');
    expect(firstNameControl?.valid).toBeFalse();

    firstNameControl?.setValue('12');
    expect(firstNameControl?.valid).toBeFalse();

    firstNameControl?.setValue('123');
    expect(firstNameControl?.valid).toBeTrue();
  });

  it('should make the lastName control required and validate its length', () => {
    const lastNameControl = component.edit_form.get('lastName');
    lastNameControl?.setValue('');
    expect(lastNameControl?.valid).toBeFalse();

    lastNameControl?.setValue('1');
    expect(lastNameControl?.valid).toBeFalse();

    lastNameControl?.setValue('12');
    expect(lastNameControl?.valid).toBeFalse();

    lastNameControl?.setValue('123');
    expect(lastNameControl?.valid).toBeTrue();
  });

  it('should validate the email control', () => {
    const emailControl = component.edit_form.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('user@example.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should render the "Edit User" title inside the tuiTitle', () => {
    const titleElement = fixture.debugElement.query(
      By.css('#edit_form h3')
    ).nativeElement;
    expect(titleElement.textContent).toContain('Edit User');
  });

  it('disables the submit button when the edit form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="button"]'));
    component.edit_form.setValue({ firstName: '', lastName: '', email: '' });
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeTrue();
  });

  it('enables the submit button when the edit form is valid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="button"]'));
    component.edit_form.setValue({ firstName: 'John', lastName: 'Doe', email: 'John@Doe.dev' });
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeFalse();
  });

  it('should render the "Edit Roles" title inside the tuiTitle', () => {
    const titleElement = fixture.debugElement.query(
      By.css('#role_form h3')
    ).nativeElement;
    expect(titleElement.textContent).toContain('Edit Roles');
  });

  it('should render the roles inside the TuiFilter', () => {
    const roles = fixture.debugElement.queryAll(By.css('tui-filter label'));
    console.log(roles);
    expect(roles.length).toBe(3);
  });

});