import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TuiDialogService } from '@taiga-ui/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authServiceMock: Partial<AuthService>;

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

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true for isPcMode when window width is greater than or equal to 768', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(800);
    expect(component.isPcMode()).toBeTrue();
  });

  it('should return false for isPcMode when window width is less than 768', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(600);
    expect(component.isPcMode()).toBeFalse();
  });

  it('should return "m" for buttonSize when in PC mode', () => {
    spyOn(component, 'isPcMode').and.returnValue(true);
    expect(component.buttonSize()).toBe('m');
  });

  it('should return "s" for buttonSize when not in PC mode', () => {
    spyOn(component, 'isPcMode').and.returnValue(false);
    expect(component.buttonSize()).toBe('s');
  });

  it('should open logOut dialog when logout is called', () => {
    const dialogService = TestBed.inject(TuiDialogService);
    const dialogSpy = spyOn(dialogService, 'open').and.callThrough();
    component.logout();

    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should log out user when user confirms log out', () => {
    const dialogService = TestBed.inject(TuiDialogService);
    const dialogSpy = spyOn(dialogService, 'open').and.returnValue(of(true));
    component.logout();

    expect(dialogSpy).toHaveBeenCalled();
    expect(authServiceMock.logOutUser).toHaveBeenCalled();
  });
});
