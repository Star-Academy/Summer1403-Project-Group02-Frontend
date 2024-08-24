import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tuiArrayRemove } from '@taiga-ui/cdk';
import { TuiButton, TuiExpand, TuiSurface } from '@taiga-ui/core';
import { TuiChevron, TuiElasticContainer } from '@taiga-ui/kit';
import { TuiInputModule } from '@taiga-ui/legacy';
import { TuiCardLarge } from '@taiga-ui/layout';

@Component({
  selector: 'app-import',
  standalone: true,
  imports: [TuiCardLarge,
    TuiSurface,
    TuiButton,
    TuiElasticContainer,
    NgForOf,
    TuiChevron,
    TuiExpand,
    TuiInputModule,
    FormsModule],
  templateUrl: './import.component.html',
  styleUrl: './import.component.scss'
})
export class ImportComponent {
  protected items = [
    {
      expanded: false,
      title: "file name here",
      value: [{key: "value", value:"qwer"}, {key: "value", value:"qwer"}],
    },
    {
      expanded: false,
      title: "file name here",
      value: [{key: "value", value:"qwer"}, {key: "value", value:"qwer"}],
    },
    {
      expanded: false,
      title: "file name here",
      value: [{key: "value", value:"qwer"}, {key: "value", value:"qwer"}],
    },
    {
      expanded: false,
      title: "file name here",
      value: [{key: "value", value:"qwer"}, {key: "value", value:"qwer"}],
    },
    {
      expanded: false,
      value: [{key: "value", value:"qwer"}, {key: "value", value:"qwer"}],
      title: "file name here",
    },
    {
      expanded: false,
      title: "file name here",
      value: [{key: "value", value:"qwer"}, {key: "value", value:"qwer"}],
    },
    {
      expanded: false,
      title: "file name here",
      value: [{key: "value", value:"qwer"}, {key: "value", value:"qwer"}],
    },
  ];

  protected add(): void {
    this.items.push({ expanded: false, title: "file name here", value: [{key: "vvvla", value:"qwer"}]});
  }

  protected remove(index: number): void {
    this.items = tuiArrayRemove(this.items, index);
  }
}
