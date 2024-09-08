import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { NgForOf, TitleCasePipe } from '@angular/common';
import { INJECTOR } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiItem } from '@taiga-ui/cdk';
import {
  TuiButton,
  TuiIcon,
  TuiSurface,
  TuiTitle,
  TuiDialogService,
} from '@taiga-ui/core';
import {
  TuiBadge,
  TuiBadgeNotification,
  TuiBreadcrumbs,
  TuiChip,
  TuiFade,
} from '@taiga-ui/kit';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { RoleAppearancePipe } from '../../../pipes/role-appearance.pipe';
import { UsernamePipe } from '../../../pipes/username.pipe';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { AdminUserService } from '../../../services/admin/admin.service';
import { AdminEditUserService } from '../../../services/admin/admin-edit-user.service';
import {
  AllUserResponse,
  UserResponse,
} from '../../../models/api/userResponse';
import { Observable, of } from 'rxjs';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UsersComponent,
        UsernamePipe,
        TuiIcon,
        TuiFade,
        TuiButton,
        TuiCardLarge,
        TuiSurface,
        TuiHeader,
        TuiTitle,
        TuiBadgeNotification,
        TuiBadge,
        TuiItem,
        TuiBreadcrumbs,
        RouterLink,
        TitleCasePipe,
        RoleAppearancePipe,
        TuiChip,
        NgForOf,
      ],
      providers: [
        {
          provide: AdminUserService,
          useValue: jasmine.createSpyObj({
            fetchUsers: jasmine.createSpyObj({
              subscribe: new Observable<AllUserResponse>((subscriber) => {
                subscriber.next({
                  data: [
                    {
                      username: 'user1',
                      firstName: 'user1',
                      lastName: 'user1',
                      email: 'user1@users.co',
                      roles: [{ roleType: 'Admin' }, { roleType: 'User' }],
                    },

                    {
                      username: 'user2',
                      firstName: 'user2',
                      lastName: 'user2',
                      email: 'user2@users.co',
                      roles: [{ roleType: 'User' }],
                    },
                  ],
                  type: 200,
                  message: 'msg',
                });
                subscriber.complete();
              }),
            }),

            getUser: jasmine.createSpyObj({
              subscribe: new Observable<UserResponse>((subscriber) => {
                subscriber.next({
                  data: {
                    username: 'user2',
                    firstName: 'user2',
                    lastName: 'user2',
                    email: 'user2@users.co',
                    roles: [{ roleType: 'User' }],
                  },
                  type: 200,
                  message: 'msg',
                });
                subscriber.complete();
              }),
            }),

            deleteUser: jasmine.createSpyObj({
              subscribe: new Observable<void>((subscriber) => {
                subscriber.next();
                subscriber.complete();
              }),
            }),
          }),
        },
        { provide: AdminEditUserService, useValue:  jasmine.createSpyObj({
            setUser: []
          }),
        },
        { provide: TuiDialogService, useValue: jasmine.createSpyObj({
            open: jasmine.createSpyObj({
              afterClosed: of('closed'),
            }),
          }), },
        { provide: INJECTOR, useValue: INJECTOR },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
