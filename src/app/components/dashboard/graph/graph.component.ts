import { Component, AfterViewInit } from '@angular/core';
import cytoscape, { CytoscapeOptions } from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
// @ts-expect-error: library doesn't support ts
import coseBilkent from 'cytoscape-cose-bilkent';
import { cytoElements } from './cytoProps/cytoElements';
import { cytoStyles } from './cytoProps/cytoStyle';
import { cytoLayout } from './cytoProps/cytoLayout';
import { cxtMenuDefaults } from './cytoProps/cxtMenuDefaults';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiChip } from '@taiga-ui/kit';
import { TuiButton, TuiIcon, TuiSurface } from '@taiga-ui/core';
import { TuiButtonClose } from '@taiga-ui/kit';
import { TuiTabs } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [
    TuiIcon,
    TuiSurface,
    SearchBarComponent,
    SearchBarComponent,
    TuiCardLarge,
    TuiChip,
    TuiButton,
    TuiButtonClose,
    TuiTabs,
    CommonModule,
  ],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss',
})
export class GraphComponent implements AfterViewInit {
  protected items = [
    {
      expanded: false,
      title: 'account.csv',
      value: {
        accountId: '6534454617',
        cardId: '6104335000000190',
        iban: 'IR120778801496000000198',
        accountType: 'Savings',
        branchTelephone: '55638667',
        branchAddress: 'Tehran - Khayam Street - Above Golbandak Intersection',
        branchName: 'Golbandak',
        ownerFirstName: 'Afsar',
        ownerLastName: 'Tabatabaei',
        ownerId: '1227114110',
      },
      dropdown: false,
    },
  ];
  activeItemIndex = 0;
  onTabClick(arg0: string) {
    throw new Error('Method not implemented.');
    console.log(arg0);
  }
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
