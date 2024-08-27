import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTabs } from '@taiga-ui/kit';

import { GraphComponent } from '../graph/graph.component';
import { ImportComponent } from '../import/import.component';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [TuiButton, TuiIcon, GraphComponent, ImportComponent, TuiTabs, FormsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent {
  protected activeItemIndex = 0;

  protected tabHandler(item: string): void {
    // if (item == "import") {
    //   this.activeItemIndex = 0;
    // }

    // else if (item == "graph") {
    //   this.activeItemIndex = 1;
    // }

    // else {
    //   this.activeItemIndex = 0;
    // }
  }
}
