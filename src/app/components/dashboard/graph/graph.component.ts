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
import { TuiChip, TuiRadioList } from '@taiga-ui/kit';
import { TuiButton, TuiIcon, TuiSurface, TuiTextfield } from '@taiga-ui/core';
import { TuiButtonClose } from '@taiga-ui/kit';
import { TuiTabs } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiDataList } from '@taiga-ui/core';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';

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
    FormsModule,
    CommonModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TuiDataListWrapper,
    TuiDataList,
    TuiRadioList,
    // ReactiveFormsModule,
    TuiInputModule,
    TuiTextfield,
  ],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss',
})
export class GraphComponent implements AfterViewInit {

  protected select_items = [
    "node 1",
    "node 2",
    "node 3",
  ];

  protected readonly radio_ops = ['All', "In Scene", 'Off Scene'];
  protected redio_target = this.radio_ops[0];

  protected select_form = new FormControl<string | null>(null);
  protected filter_text = new FormControl<string | null>(null);

  protected activeRightPanelTab = 0;

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
