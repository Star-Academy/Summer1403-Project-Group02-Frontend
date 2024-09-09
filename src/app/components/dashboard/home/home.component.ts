import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  dataGroups = [
    {
      dataGroupId: 1,
      name: 'Group 1',
      createAt: '2024-08-28T18:20:18.474778Z',
      updateAt: '2024-08-28T18:20:18.474778Z',
    },
    // {
    //   dataGroupId: 2,
    //   name: 'Group 2',
    //   createAt: '2024-08-28T18:55:19.984789Z',
    //   updateAt: '2024-08-28T18:55:19.984789Z',
    // },
    // {
    //   dataGroupId: 3,
    //   name: 'Group 3',
    //   createAt: '2024-08-28T22:44:32.227683Z',
    //   updateAt: '2024-08-28T22:44:32.227683Z',
    // },
    // {
    //   dataGroupId: 4,
    //   name: 'Group 4',
    //   createAt: '2024-09-06T15:32:53.280587Z',
    //   updateAt: '2024-09-06T15:32:53.280587Z',
    // },
  ];
}
