import { Component, AfterViewInit } from '@angular/core';
import cytoscape, { Singular } from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';

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

    // Initialize Cytoscape graph
    const cy = cytoscape({
      container: document.getElementById('cy'),
      elements: [
        { data: { id: 'a' } }, // Node a
        { data: { id: 'b' } }, // Node b
        { data: { id: 'ab', source: 'a', target: 'b' } }, // Edge ab
      ],

      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#526ed3',
            label: 'data(id)',
          },
        },
        {
          selector: 'edge',
          style: {
            width: 3,
            'line-color': '#4056a5',
            'target-arrow-color': '#4056a5',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
          },
        },
      ],

      layout: {
        name: 'grid',
        rows: 1,
      },
    });

    // The default values of each option are outlined below:
    const defaults = {
      menuRadius: function (ele: Singular) {
        console.log(ele);
        return 100;
      }, // Updated to use the more generic Singular type
      selector: 'node', // Elements matching this Cytoscape.js selector will trigger cxtmenus
      commands: [
        {
          fillColor: 'rgba(209, 214, 230, 0.75)', // Optional: custom background color for the item
          content: 'a command name', // HTML/text content to be displayed in the menu
          contentStyle: {}, // CSS key:value pairs to set the command's CSS in JS if you want
          select: function (ele: Singular) {
            // A function to execute when the command is selected
            console.log(ele.id()); // `ele` holds the reference to the active element
          },
          hover: function (ele: Singular) {
            // A function to execute when the command is hovered
            console.log(ele.id()); // `ele` holds the reference to the active element
          },
          enabled: true, // Whether the command is selectable
        },
        {
          fillColor: 'rgba(209, 214, 230, 0.75)', // Optional: custom background color for the item
          content: 'another command name', // HTML/text content to be displayed in the menu
          contentStyle: {}, // CSS key:value pairs to set the command's CSS in JS if you want
          select: function (ele: Singular) {
            // A function to execute when the command is selected
            console.log(ele.id()); // `ele` holds the reference to the active element
          },
          hover: function (ele: Singular) {
            // A function to execute when the command is hovered
            console.log(ele.id()); // `ele` holds the reference to the active element
          },
          enabled: true, // Whether the command is selectable
        },
      ],
      fillColor: 'rgba(0, 0, 0, 0.75)', // The background color of the menu
      activeFillColor: 'rgba(1, 105, 217, 0.75)', // The color used to indicate the selected command
      activePadding: 20, // Additional size in pixels for the active command
      indicatorSize: 24, // The size in pixels of the pointer to the active command
      separatorWidth: 3, // The empty spacing in pixels between successive commands
      spotlightPadding: 4, // Extra spacing in pixels between the element and the spotlight
      adaptativeNodeSpotlightRadius: false, // Specify whether the spotlight radius should adapt to the node size
      minSpotlightRadius: 24, // The minimum radius in pixels of the spotlight
      maxSpotlightRadius: 38, // The maximum radius in pixels of the spotlight
      openMenuEvents: 'cxttapstart taphold', // Events that will open the menu
      itemColor: 'white', // The color of text in the command's content
      itemTextShadowColor: 'transparent', // The text shadow color of the command's content
      zIndex: 9999, // The z-index of the UI div
      atMouse: false, // Draw menu at mouse position
      outsideMenuCancel: false as number | false | undefined, // Use the correct type
    };

    const menu = cy.cxtmenu(defaults);

    console.log(menu);
  }
}
