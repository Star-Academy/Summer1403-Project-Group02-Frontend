import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiIcon } from '@taiga-ui/core';
import { TuiAvatar, TuiFade } from '@taiga-ui/kit';
import { TuiCardLarge } from '@taiga-ui/layout';
import { AvatarTextPipe } from '../../../pipes/avatar-text.pipe';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TuiIcon, TuiFade, TuiCardLarge, ReactiveFormsModule, TuiAvatar, UpperCasePipe, AvatarTextPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  protected name = "name family";
}
