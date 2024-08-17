import { UpperCasePipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiIcon, TuiTitle } from '@taiga-ui/core';
import { TuiAvatar, TuiFade } from '@taiga-ui/kit';
import { TuiCardLarge } from '@taiga-ui/layout';
import { AvatarTextPipe } from '../../../pipes/avatar-text.pipe';
import { UsernamePipe } from '../../../pipes/username.pipe';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TuiIcon, TuiFade, TuiTitle, TitleCasePipe, TuiCardLarge, ReactiveFormsModule, TuiAvatar, UpperCasePipe, UsernamePipe, AvatarTextPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  protected name = "name family";
  protected username = "name_family";
}
