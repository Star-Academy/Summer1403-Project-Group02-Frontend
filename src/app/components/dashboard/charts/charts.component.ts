import { Component, OnInit } from '@angular/core';
import { CxAttributeNameMap, CytoscapejsComponent } from 'ngx-cytoscapejs';
import { Core, CytoscapeOptions } from 'cytoscape';
// import { CxConverter } from 'ngx-cytoscapejs';
import { GraphDataService } from '../../../services/graph/graph-data.service';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CytoscapejsComponent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent implements OnInit {
  constructor(private graphDataService: GraphDataService) {}
  ngOnInit(): void {
    this.renderCytoscapeGraph();
  }
  // Your Cytoscape graph data.
  cytoscapeOptions: CytoscapeOptions = {};

  // When set to true the graph will be fit every time the browser window is resized.
  autoFit = true;

  // All of the library’s features are accessed through this object.
  core!: Core;

  // Your Cytoscape graph data.
  cytoscapeJsonData!: CytoscapeOptions;

  // Your CX graph data. The data is converted using the the converters provided in the cxConverters input.
  cxData!: unknown;

  cxAttributeNameMap!: CxAttributeNameMap;

  // Emits a Core every time a new core is created.
  coreChanged(core: Core): void {
    // do something with the core
    this.core = core;
  }

  renderCytoscapeGraph(): void {
    if (!this.cytoscapeJsonData) {
      this.graphDataService.getCyData().subscribe((data) => {
        this.cxData = null;
        this.cytoscapeJsonData = data;
        this.cytoscapeOptions = this.cytoscapeJsonData;
      });
    } else {
      this.cytoscapeJsonData = { ...this.cytoscapeJsonData };
      this.cytoscapeOptions = this.cytoscapeJsonData;
    }
  }

  cxAttributeNameMapChanged(cxAttributeNameMap: CxAttributeNameMap): void {
    this.cxAttributeNameMap = cxAttributeNameMap;
  }
}
