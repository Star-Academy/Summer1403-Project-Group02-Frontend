import { Component, OnInit } from '@angular/core';
import {
  DataGroup,
  DatasetCardComponent,
} from './dataset-card/dataset-card.component';
import { TuiHeader } from '@taiga-ui/layout';
import { TuiButton } from '@taiga-ui/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatasetCardComponent, TuiHeader, TuiButton],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  dataGroups: DataGroup[] = []; // Initialize as an empty array
  loading = true;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Show loader while data is being fetched
    this.route.data.subscribe(
      (data) => {
        this.dataGroups = data['dataGroups']; // Fetch the data from the resolver
        this.loading = false; // Data fetched, turn off the loader
      },
      (error) => {
        console.error('Error fetching data groups:', error);
        this.loading = false; // Turn off loader even if there's an error
      }
    );
  }

  navigateToImport() {
    this.router.navigate(['/dashboard/import']);
  }
}
