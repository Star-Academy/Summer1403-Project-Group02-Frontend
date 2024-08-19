import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarText',
  standalone: true
})
export class AvatarTextPipe implements PipeTransform {

  transform(value: string): string {

    const s = value.split(" ");
    if (s.length >= 1 && s[0]) {
      if (s.length >= 2) {
        return s[0][0].toUpperCase() + s[1][0].toUpperCase();
      }
      return s[0][0].toUpperCase() + s[0][1].toUpperCase();
    }

    return "@tui.user";
  }

}
