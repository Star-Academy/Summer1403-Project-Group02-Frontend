import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-dataset-card',
  standalone: true,
  imports: [DatePipe, TuiButton],
  templateUrl: './dataset-card.component.html',
  styleUrl: './dataset-card.component.scss',
})
export class DatasetCardComponent {
  @Input()
  data!: DataGroup;
}

export interface DataGroup {
  dataGroupId: number;
  name: string;
  createAt: string; // ISO date string format
  updateAt: string; // ISO date string format
}
