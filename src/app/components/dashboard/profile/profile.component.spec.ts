import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authServiceMock: Partial<AuthService>;
  let routerMock: Partial<Router>;

  beforeEach(async () => {
    authServiceMock = {
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(
        of({
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_doe',
          roles: [{ roleType: 'Admin' }, { roleType: 'Developer' }],
        })
      ),
      logOutUser: jasmine.createSpy('logOutUser').and.returnValue(of({})),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with user data', () => {
    const name = fixture.debugElement.query(
      By.css('div[id="prof-header"] h2')
    ).nativeElement;
    expect(name.textContent).toBe(' John Doe @john_doe');

    const username = fixture.debugElement.query(
      By.css('div[id="prof-header"] h2 div')
    ).nativeElement;
    expect(username.textContent).toBe('@john_doe');
  });

  it('should show user roles', () => {
    const roles = fixture.debugElement.queryAll(By.css('tui-chip'));
    expect(roles.length).toBe(2);
    expect(roles[0].nativeElement.textContent).toBe(' Admin ');
    expect(roles[1].nativeElement.textContent).toBe(' Developer ');
  });

  it('should show change password dialog', () => {
    spyOn(component['changePassDialog'], 'subscribe');
    component.showChangePassDialog();
    expect(component['changePassDialog'].subscribe).toHaveBeenCalled();
  });

  it('should show update info dialog', () => {
    spyOn(component['editDialog'], 'subscribe');
    component.showUpdateInfoDialog();
    expect(component['editDialog'].subscribe).toHaveBeenCalled();
  });

  it('should show logout dialog and log out user on confirmation', () => {
    spyOn(component['dialogs'], 'open').and.returnValue(of(true));
    component.showLogoutDialog();
    expect(component['dialogs'].open).toHaveBeenCalled();
    expect(authServiceMock.logOutUser).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should not log out user if logout is cancelled', () => {
    spyOn(component['dialogs'], 'open').and.returnValue(of(false));
    component.showLogoutDialog();
    expect(component['dialogs'].open).toHaveBeenCalled();
    expect(authServiceMock.logOutUser).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
