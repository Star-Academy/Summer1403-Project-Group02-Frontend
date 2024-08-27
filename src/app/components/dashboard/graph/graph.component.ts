import { Component, AfterViewInit } from '@angular/core';
import cytoscape, { CytoscapeOptions } from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
// @ts-expect-error: library doesn't support ts
import coseBilkent from 'cytoscape-cose-bilkent';
import { cytoElements } from './cytoProps/cytoElements';
import { cytoStyles } from './cytoProps/cytoStyle';
import { cytoLayout } from './cytoProps/cytoLayout';
import { cxtMenuDefaults } from './cytoProps/cxtMenuDefaults';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss',
})
export class GraphComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    cytoscape.use(cxtmenu);
    cytoscape.use(coseBilkent);

    const cytoDefaults = {
      container: document.getElementById('cy'),
      elements: cytoElements,
      style: cytoStyles,
      layout: cytoLayout,
      minZoom: 0.3,
      maxZoom: 3,
      wheelSensitivity: 0.2,
    } as CytoscapeOptions;

    const cy = cytoscape(cytoDefaults);

    cy.cxtmenu(cxtMenuDefaults);

    cy.style()
      .selector('node')
      .style({
        'font-family': 'Roboto, Arial',
      })
      .update();
  }
}
