import { Pipe, PipeTransform } from '@angular/core';

// this pipe is used to change the appearance
// of the role badge based on the role
@Pipe({
  name: 'roleAppearance',
  standalone: true
})
export class RoleAppearancePipe implements PipeTransform {
  transform(value: string): string {

    if (value.toLowerCase() === 'admin') {
      return 'success';
    }

    else if (value.toLowerCase() === 'developer') {
      return 'warning';
    }

    return "neutral";
  }
}
