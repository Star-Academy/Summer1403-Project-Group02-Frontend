import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CytoscapeOptions } from 'cytoscape';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphDataService {
  constructor(private httpClient: HttpClient) {}

  getCyData(): Observable<CytoscapeOptions> {
    return this.httpClient.get<CytoscapeOptions>('cy-data.json');
  }
}
