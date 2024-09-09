import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiHint, TuiTextfield } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [TuiInputModule, TuiTextfield, FormsModule, TuiHint],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  protected value = '';
}
